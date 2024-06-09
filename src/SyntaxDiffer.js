import React from 'react';
import yaml from 'js-yaml';
import SyntaxRow from './SyntaxRow';
import LanguageToggle from './LanguageToggle';
import './styles.css';

class SyntaxDiffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: null,
            selectedLanguages: ['python', 'go'],
            languages: [],
            showYamlModal: false,
            generatedYaml: '',
            showNewSyntaxModal: false, // New state for showing the new syntax modal
            newTitle: '',
            newExample: '',
            newNotes: '',
            newCategoryIndex: null,
            newSubcategoryIndex: null,
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
                const languages = parsedData.languages.map(language => language.name);
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

    handleNewSyntax = (categoryIndex, subcategoryIndex) => {
        // Open the new syntax modal by updating state
        this.setState({
            showNewSyntaxModal: true,
            newCategoryIndex: categoryIndex,
            newSubcategoryIndex: subcategoryIndex,
        });
    };

    handleNewSyntaxInputChange = event => {
        // Update state for each input change in the new syntax modal
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmitNewSyntax = () => {
        const { newTitle, newExample, newNotes, newCategoryIndex, newSubcategoryIndex } = this.state;

        // Create a new syntax object
        const newSyntax = {
            title: newTitle,
            example: newExample,
            notes: newNotes,
            language: "javascript", // Assuming the new syntax is for JavaScript
        };

        // Update the state with the new syntax
        const updatedData = { ...this.state.data };
        updatedData.syntaxes[newCategoryIndex].subcategories[newSubcategoryIndex].details.push(newSyntax);
        this.setState({
            data: updatedData,
            showNewSyntaxModal: false, // Close the modal after submission
            newTitle: '', // Reset the input fields
            newExample: '',
            newNotes: '',
            newCategoryIndex: null, // Reset the category and subcategory indices
            newSubcategoryIndex: null,
        });
    };

    handleCloseNewSyntaxModal = () => {
        // Close the new syntax modal without making any changes
        this.setState({
            showNewSyntaxModal: false,
            newTitle: '', // Reset the input fields
            newExample: '',
            newNotes: '',
            newCategoryIndex: null, // Reset the category and subcategory indices
            newSubcategoryIndex: null,
        });
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
        const { data, error, selectedLanguages, languages, showYamlModal, generatedYaml, showNewSyntaxModal, newTitle, newExample, newNotes } = this.state;

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
                                        onNewSyntax={() => this.handleNewSyntax(categoryIndex, subcategoryIndex)}
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
                {showNewSyntaxModal && (
                    <div className="new-syntax-modal">
                        <div className="new-syntax-modal-content">
                            <h2>New Syntax</h2>
                            <div className="input-group">
                                <label>Title:</label>
                                <input type="text" name="newTitle" value={newTitle} onChange={this.handleNewSyntaxInputChange} />
                            </div>
                            <div className="input-group">
                                <label>Example:</label>
                                <textarea name="newExample" value={newExample} onChange={this.handleNewSyntaxInputChange} />
                            </div>
                            <div className="input-group">
                                <label>Notes:</label>
                                <textarea name="newNotes" value={newNotes} onChange={this.handleNewSyntaxInputChange} />
                            </div>
                            <div className="button-group">
                                <button onClick={this.handleSubmitNewSyntax}>Submit</button>
                                <button onClick={this.handleCloseNewSyntaxModal}>Cancel</button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        );
    }
}

export default SyntaxDiffer;

