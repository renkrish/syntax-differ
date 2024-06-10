// SyntaxContext.js
import React, { createContext, useContext, useState } from 'react';

const SyntaxContext = createContext();

export const SyntaxProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [selectedLanguages, setSelectedLanguages] = useState(['python', 'go']);
    const [showNewSyntaxModal, setShowNewSyntaxModal] = useState(false);
    const [newCategoryIndex, setNewCategoryIndex] = useState(null);
    const [newSubcategoryIndex, setNewSubcategoryIndex] = useState(null);
    const [languages, setLanguages] = useState([]);
    const [error, setError] = useState(null);
    const [generatedYaml, setGeneratedYaml] = useState('');
    const [showYamlModal, setShowYamlModal] = useState(false);

    return (
        <SyntaxContext.Provider value={{
            data,
            setData,
            selectedLanguages,
            setSelectedLanguages,
            showNewSyntaxModal,
            setShowNewSyntaxModal,
            newCategoryIndex,
            setNewCategoryIndex,
            newSubcategoryIndex,
            setNewSubcategoryIndex,
            languages,
            setLanguages,
            error,
            setError,
            generatedYaml,
            setGeneratedYaml,
            showYamlModal,
            setShowYamlModal,
        }}>
            {children}
        </SyntaxContext.Provider>
    );
};

export const useSyntax = () => useContext(SyntaxContext);
