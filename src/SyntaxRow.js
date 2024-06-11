import React, { useState } from 'react';
import SyntaxBox from './SyntaxBox';
import deleteIcon from './assets/delete_raw .svg';
import { useSyntax } from './SyntaxContext';
import { getSubcategory, updateSubcategoryTitle, insertDummySubcategory, deletedSubcategory } from './dataUtils';
import './styles.css';

const SyntaxRow = ({ categoryIndex, subcategoryIndex }) => {
    const { data, setData, selectedLanguages, languages } = useSyntax();

    const subcategory = getSubcategory(data, categoryIndex, subcategoryIndex);
    const { title, details } = subcategory;

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    const handleTitleBlur = () => {
        const updatedData = updateSubcategoryTitle(data, categoryIndex, subcategoryIndex, editedTitle);
        setData(updatedData);
        setIsEditing(false);
    };

    const handleTitleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleNewClick = () => {
        const updatedData = insertDummySubcategory(data, languages, categoryIndex, subcategoryIndex);
        setData(updatedData);
    };

    return (
        <div className="syntax-row">
            <div className="syntax-row-title" onDoubleClick={handleTitleDoubleClick}>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        autoFocus
                    />
                ) : (
                    <h3>{title}</h3>
                )}
            </div>
            <div className="syntax-column">
                {selectedLanguages
                    .map(language => details.findIndex(detail => detail.language === language))
                    .filter(index => index !== -1)
                    .map((languageIndex, index) => (
                        <SyntaxBox
                            key={index}
                            categoryIndex={categoryIndex}
                            subcategoryIndex={subcategoryIndex}
                            languageIndex={languageIndex}
                        />
                    ))}
            </div>
            <img
                src={deleteIcon}
                alt="New"
                className="new-icon"
                onClick={()=> setData(deletedSubcategory(data, categoryIndex, subcategoryIndex))}
            />
        </div>
    );
};

export default SyntaxRow;
