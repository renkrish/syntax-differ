import React from 'react';
import yaml from 'js-yaml';
import SyntaxRow from './SyntaxRow';
import LanguageToggle from './LanguageToggle'; // Import LanguageToggle component
import './styles.css';

class SyntaxDiffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: null,
            selectedLanguages: ['python', 'go'], // Set Python and Go as default selected languages
            languages: [], // Initialize languages array
            showYamlModal: false, // State to control the YAML modal visibility
            generatedYaml: '', // State to hold the generated YAML content
        };
    }

    componentDidMount() {
        fetch(process.env.PUBLIC_URL + '/syntax.yaml')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                const parsedData = yaml.load(text);
                const languages = parsedData.languages.map(language => language.name); // Extract language names from YAML data
                this.setState({ data: parsedData, languages });
            })
            .catch(error => {
                console.error('Error loading YAML file:', error);
                this.setState({ error: 'Failed to load syntax data.' });
            });
    }

    toggleLanguage = language => {
        const { selectedLanguages } = this.state;
        const index = selectedLanguages.indexOf(language);
        if (index === -1) {
            this.setState({ selectedLanguages: [...selectedLanguages, language] });
        } else {
            const updatedLanguages = [...selectedLanguages];
            updatedLanguages.splice(index, 1);
            this.setState({ selectedLanguages: updatedLanguages });
        }
    };

    handleTitleEdit = (categoryIndex, subcategoryIndex, newTitle) => {
        const updatedData = { ...this.state.data };
        updatedData.syntaxes[categoryIndex].subcategories[subcategoryIndex].title = newTitle;
        this.setState({ data: updatedData });
    };

    handleDetailEdit = (categoryIndex, subcategoryIndex, detailIndex, newDetail) => {
        const updatedData = { ...this.state.data };
        updatedData.syntaxes[categoryIndex].subcategories[subcategoryIndex].details[detailIndex] = newDetail;
        this.setState({ data: updatedData });
    };

    generateYamlContent = () => {
        const { data } = this.state;
        const generatedYaml = yaml.dump(data);
        this.setState({ generatedYaml, showYamlModal: true });
    };

    closeYamlModal = () => {
        this.setState({ showYamlModal: false });
    };

    render() {
        const { data, error, selectedLanguages, languages, showYamlModal, generatedYaml } = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        if (!data) {
            return <div>Loading...</div>;
        }

        return (
            <div className="differ-container">
                <LanguageToggle
                    languages={languages}
                    selectedLanguages={selectedLanguages}
                    toggleLanguage={this.toggleLanguage}
                />
                <div className="differ-header">
                    {selectedLanguages.map(language => (
                        <h2 key={language} className="differ-title-language">
                            {language}
                        </h2>
                    ))}
                </div>
                <div className="differ-content">
                    {Array.isArray(data.syntaxes) && data.syntaxes.length > 0 ? (
                        data.syntaxes.map((syntax, categoryIndex) => (
                            <div key={syntax.category}>
                                <h2>{syntax.category}</h2>
                                {syntax.subcategories.map((subcategory, subcategoryIndex) => (
                                    <SyntaxRow
                                        key={subcategory.title}
                                        title={subcategory.title}
                                        details={subcategory.details.filter(detail => selectedLanguages.includes(detail.language))}
                                        onTitleEdit={(newTitle) => this.handleTitleEdit(categoryIndex, subcategoryIndex, newTitle)}
                                        onDetailEdit={(detailIndex, newDetail) => this.handleDetailEdit(categoryIndex, subcategoryIndex, detailIndex, newDetail)}
                                    />
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>No syntax data available.</div>
                    )}
                </div>
                <button onClick={this.generateYamlContent} className="generate-yaml-button">
                    Generate YAML
                </button>
                {showYamlModal && (
                    <div className="yaml-modal">
                        <div className="yaml-modal-content">
                            <h2>Updated YAML Content</h2>
                            <textarea readOnly value={generatedYaml} className="yaml-textarea" />
                            <button onClick={this.closeYamlModal} className="close-modal-button">
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default SyntaxDiffer;
