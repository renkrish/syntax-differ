// SyntaxDiffer.js
import React, { useEffect } from 'react';
import yaml from 'js-yaml';
import SyntaxRow from './SyntaxRow';
import LanguageToggle from './LanguageToggle';
import ExportData from './ExportData';
import { useSyntax } from './SyntaxContext';
import newIcon from './assets/new_syntax.svg';
import './styles.css';
import {insertDummySubcategory } from './dataUtils';

const SyntaxDiffer = () => {
    const {
        data,
        setData,
        languages,
        selectedLanguages,
        setLanguages,
        error,
        setError
    } = useSyntax();

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/syntax.yaml')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                const parsedData = yaml.load(text);
                const languageNames = parsedData.languages.map(language => language.name);
                setData(parsedData);
                setLanguages(languageNames);
            })
            .catch(error => {
                console.error('Error loading YAML file:', error);
                setError('Failed to load syntax data.');
            });
    }, [setData, setLanguages, setError]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="differ-container">
            <LanguageToggle />
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
                                <>
                                
                                <SyntaxRow
                                    key={subcategory.title}
                                    categoryIndex={categoryIndex}
                                    subcategoryIndex={subcategoryIndex}
                                />
                                <img
                                src={newIcon}
                                alt="New"
                                className="add-new-row-icon"
                                onClick={() => setData(insertDummySubcategory(data, languages, categoryIndex, subcategoryIndex))}
                            />
                            </>
                            ))}
                        </div>
                    ))
                ) : (
                    <div>No syntax data available.</div>
                )}
            </div>
            <ExportData />
        </div>
    );
};

export default SyntaxDiffer;
