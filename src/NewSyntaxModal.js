import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './NewSyntax.css';

const NewSyntaxModal = ({ onSubmit, onClose, languages, categoryIndex, subCategoryIndex, data }) => {
    const [newExample, setNewExample] = useState('');
    const [newNotes, setNewNotes] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [newCategoryIndex, setNewCategoryIndex] = useState(categoryIndex);
    const [newTitle, setNewTitle] = useState('');
    const [categoryTitle, setCategoryTitle] = useState('');

    useEffect(() => {
        // Set the category and subcategory titles based on the provided indices and data content
        if (data && data.syntaxes && data.syntaxes[categoryIndex] && data.syntaxes[categoryIndex].category) {
            setCategoryTitle(data.syntaxes[categoryIndex].category);
            if (
                data.syntaxes[categoryIndex].subcategories &&
                data.syntaxes[categoryIndex].subcategories[subCategoryIndex] &&
                data.syntaxes[categoryIndex].subcategories[subCategoryIndex].title
            ) {
                setNewTitle(data.syntaxes[categoryIndex].subcategories[subCategoryIndex].title);
            }
        }
    }, [data, categoryIndex, subCategoryIndex]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'newTitle') {
            setNewTitle(value);
        } else if (name === 'newExample') {
            setNewExample(value);
        } else if (name === 'newNotes') {
            setNewNotes(value);
        }
    };

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
                details: [newSyntax],
            };
            // Find the index where the new subcategory should be inserted
            const insertIndex = subCategoryIndex + 1;

            // Insert the new subcategory at the specified index
            category.subcategories.splice(insertIndex, 0, newSubcategory);
        }
    
        // Pass the updated data back to the parent component
        onSubmit(data);
    
        // Reset the form fields
        setNewTitle('');
        setSelectedLanguage(null);
        setNewExample('');
        setNewNotes('');
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
                    <input type="text" name="newTitle" value={newTitle} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label>Example:</label>
                    <textarea name="newExample" className='example-textarea' value={newExample} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label>Notes:</label>
                    <textarea name="newNotes" value={newNotes} onChange={handleInputChange} />
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
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NewSyntaxModal;
