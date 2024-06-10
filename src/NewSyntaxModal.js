import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useSyntax } from './SyntaxContext';
import './NewSyntax.css';

const NewSyntaxModal = () => {
    const {
        data,
        setData,
        languages,
        setShowNewSyntaxModal,
        newCategoryIndex,
        setNewCategoryIndex,
        newSubcategoryIndex,
        setNewSubcategoryIndex,
        
    } = useSyntax();

    const [newExample, setNewExample] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [categoryTitle, setCategoryTitle] = useState('');

    useEffect(() => {
        // Set the category and subcategory titles based on the provided indices and data content
        if (data && data.syntaxes && data.syntaxes[newCategoryIndex] && data.syntaxes[newCategoryIndex].category) {
            setCategoryTitle(data.syntaxes[newCategoryIndex].category);
            if (
                data.syntaxes[newCategoryIndex].subcategories &&
                data.syntaxes[newCategoryIndex].subcategories[newSubcategoryIndex] &&
                data.syntaxes[newCategoryIndex].subcategories[newSubcategoryIndex].title
            ) {
                setNewTitle(data.syntaxes[newCategoryIndex].subcategories[newSubcategoryIndex].title);
            }
        }
    }, [data, newCategoryIndex, newSubcategoryIndex]);


    const handleClose = () => {
        setNewCategoryIndex(null)
        setNewSubcategoryIndex(null)
    }
    const handleSubmit = () => {
        // Create a new syntax object
        const newSyntax = {
            language: selectedLanguage.value,
            example: newExample,
            notes: newNotes,
        };
    
        // Get the category from the data
        const category = data.syntaxes[newCategoryIndex];
    
        // Check if the category's subcategories array exists
        if (!category.subcategories) {
            category.subcategories = [];
        }
    
        // Find the subcategory with the provided title, if it exists
        const subcategory = category.subcategories.find(sub => sub.title === newTitle);
    
        if (subcategory) {
            // Check if the provided language already exists in the details array
            const existingLanguage = subcategory.details.find(detail => detail.language === newSyntax.language);
            if (existingLanguage) {
                // Throw an error if the language already exists
                throw new Error(`Language '${newSyntax.language}' already exists in subcategory '${newTitle}'.`);
            } else {
                // Add the new syntax to the details array of the existing subcategory
                subcategory.details.push(newSyntax);
            }
        } else {
            // If the subcategory does not exist, create a new one
            const newSubcategory = {
                title: newTitle,
                details: languages.map(language => language === newSyntax.language ? newSyntax : { language, example: "TBD", notes: "TBD" }),
            };

            // Insert the new subcategory at the specified index
            category.subcategories.splice(newSubcategoryIndex + 1, 0, newSubcategory);
        }
    
        // Pass the updated data back to the parent component
        setData(data);
    
        // Reset the form fields
        setNewTitle('');
        setSelectedLanguage(null);
        setNewExample('');
        setNewNotes('');
        setShowNewSyntaxModal(false);
    };
    

    const languageOptions = languages.map((lang) => ({
        value: lang,
        label: lang,
    }));

    return (
        <div className="new-syntax-modal">
            <div className="new-syntax-modal-content">
                <h2>New Syntax</h2>
                <div className="input-group">
                    <label>Category:</label>
                    <input type="text" value={categoryTitle} disabled />
                </div>
                <div className="input-group">
                    <label>Title:</label>
                    <input type="text" name="newTitle" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Example:</label>
                    <textarea name="newExample" className='example-textarea' value={newExample} onChange={e => setNewExample(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Notes:</label>
                    <textarea name="newNotes" value={newNotes} onChange={e => setNewNotes(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Language:</label>
                    <Select
                        value={selectedLanguage}
                        onChange={setSelectedLanguage}
                        options={languageOptions}
                        placeholder="Select a language"
                    />
                </div>
                <div className="button-group">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NewSyntaxModal;
