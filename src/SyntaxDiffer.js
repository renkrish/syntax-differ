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
        };
    }

    componentDidMount() {
        fetch('syntax.yaml')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                const parsedData = yaml.safeLoad(text);
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

    render() {
        const { data, error, selectedLanguages, languages } = this.state;

        if (error) {
            return <div>{error}</div>;
        }

        if (!data) {
            return <div>Loading...</div>;
        }

        return (
            <div className="differ-container">
                    {/* Toggle buttons */}
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
                        data.syntaxes.map(syntax => (
                            <div key={syntax.category}>
                                <h2>{syntax.category}</h2>
                                {syntax.subcategories.map(subcategory => (
                                    <SyntaxRow
                                        key={subcategory.title}
                                        title={subcategory.title}
                                        details={subcategory.details.filter(detail => selectedLanguages.includes(detail.language))}
                                    />
                                ))}
                            </div>
                        ))
                    ) : (
                        <div>No syntax data available.</div>
                    )}
                </div>
            </div>
        );
    }
}

export default SyntaxDiffer;
