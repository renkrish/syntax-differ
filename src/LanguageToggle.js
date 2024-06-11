// LanguageToggle.js
import React from 'react';
import { useSyntax } from './SyntaxContext';
import './styles.css'; // Import CSS file for styling

const LanguageToggle = () => {
    const { languages, selectedLanguages, toggleLanguage } = useSyntax();

    return (
        <div className="language-toggle-container">
            {languages.map(language => (
                <button
                    key={language}
                    className={`language-toggle-button ${selectedLanguages.includes(language) ? 'active' : ''}`}
                    onClick={() => toggleLanguage(language)}
                >
                    {language}
                </button>
            ))}
        </div>
    );
};

export default LanguageToggle;
