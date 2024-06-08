import React from 'react';
import yaml from 'js-yaml';
import SyntaxRow from './SyntaxRow';
import './styles.css';

class SyntaxDiffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: null,
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
                this.setState({ data: yaml.safeLoad(text) });
            })
            .catch(error => {
                console.error('Error loading YAML file:', error);
                this.setState({ error: 'Failed to load syntax data.' });
            });
    }

    render() {
        const { data, error } = this.state;
        const { languages } = this.props;

        if (error) {
            return <div>{error}</div>;
        }

        if (!data) {
            return <div>Loading...</div>;
        }

        return (
            <div className="differ-container">
                <div className="differ-header">
                    {languages.map(language => (
                        <div key={language} className="differ-title-language">
                            {language}
                        </div>
                    ))}
                </div>
                <div className="differ-content">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map(category => (
                            <div key={category.category}>
                                <h2>{category.category}</h2>
                                {category.subcategories.map(subcategory => (
                                    <SyntaxRow
                                        key={subcategory.title}
                                        title={subcategory.title}
                                        details={subcategory.details.filter(detail => languages.includes(detail.language))}
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
