// SyntaxDiffer.js
import React, { useEffect, useState } from 'react';
import yaml from 'js-yaml';
import SyntaxRow from './SyntaxRow';
import LanguageToggle from './LanguageToggle';
import NewSyntaxModal from './NewSyntaxModal';
import { useSyntax } from './SyntaxContext';

import './styles.css';

const SyntaxDiffer = () => {

    const {
        data,
        setData,
        selectedLanguages,
        setSelectedLanguages,
        languages,
        setLanguages,
        showYamlModal,
        generatedYaml,
        showNewSyntaxModal,
        setShowNewSyntaxModal,
        setNewCategoryIndex,
        setNewSubcategoryIndex,
        error,
        setError,
        setGeneratedYaml,
        setShowYamlModal,
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

    const toggleLanguage = language => {
        const index = selectedLanguages.indexOf(language);
        if (index === -1) {
            setSelectedLanguages([...selectedLanguages, language]);
        } else {
            const updatedLanguages = [...selectedLanguages];
            updatedLanguages.splice(index, 1);
            setSelectedLanguages(updatedLanguages);
        }
    };

    const handleTitleEdit = (categoryIndex, subcategoryIndex, newTitle) => {
        const updatedData = { ...data };
        updatedData.syntaxes[categoryIndex].subcategories[subcategoryIndex].title = newTitle;
        setData(updatedData);
    };

    const handleDetailEdit = (categoryIndex, subcategoryIndex, detailIndex, newDetail) => {
        const updatedData = { ...data };
        updatedData.syntaxes[categoryIndex].subcategories[subcategoryIndex].details[detailIndex] = newDetail;
        setData(updatedData);
    };

    const handleNewSyntax = (categoryIndex, subcategoryIndex) => {
        setShowNewSyntaxModal(true);
        setNewCategoryIndex(categoryIndex);
        setNewSubcategoryIndex(subcategoryIndex);
    };

    const generateYamlContent = () => {
        const generatedYaml = yaml.dump(data);
        setGeneratedYaml(generatedYaml);
        setShowYamlModal(true);
    };

    const closeYamlModal = () => {
        setShowYamlModal(false);
    };

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
                toggleLanguage={toggleLanguage}
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
                                    onTitleEdit={(newTitle) => handleTitleEdit(categoryIndex, subcategoryIndex, newTitle)}
                                    onDetailEdit={(detailIndex, newDetail) => handleDetailEdit(categoryIndex, subcategoryIndex, detailIndex, newDetail)}
                                    onNewSyntax={() => handleNewSyntax(categoryIndex, subcategoryIndex)}
                                />
                            ))}
                        </div>
                    ))
                ) : (
                    <div>No syntax data available.</div>
                )}
            </div>
            <button onClick={generateYamlContent} className="generate-yaml-button">
                Generate YAML
            </button>
            {showYamlModal && (
                <div className="yaml-modal">
                    <div className="yaml-modal-content">
                        <h2>Updated YAML Content</h2>
                        <textarea readOnly value={generatedYaml} className="yaml-textarea" />
                        <button onClick={closeYamlModal} className="close-modal-button">
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showNewSyntaxModal && (
                <NewSyntaxModal/>
            )}
        </div>
    );
};

export default SyntaxDiffer;
