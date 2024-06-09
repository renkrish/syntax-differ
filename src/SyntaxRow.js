import React, { useState } from 'react';
import SyntaxBox from './SyntaxBox';
import './styles.css';
import editIcon from './assets/edit_note.svg'; // Adjust the path as necessary

const SyntaxRow = ({ title, details, onTitleEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
        if (editedTitle !== title) {
            onTitleEdit(editedTitle);
        }
    };

    return (
        <div className="syntax-row">
            <h3 className="syntax-title">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        autoFocus
                        className="edit-input"
                    />
                ) : (
                    <>
                        {title}
                        <img
                            src={editIcon}
                            alt="Edit"
                            className="edit-icon"
                            onClick={handleEditClick}
                        />
                    </>
                )}
            </h3>
            <div className="syntax-column">
                {details.map((detail, index) => (
                    <SyntaxBox
                        key={index}
                        description={detail.description}
                        example={detail.example}
                        notes={detail.notes}
                        language={detail.language}
                    />
                ))}
            </div>
        </div>
    );
};

export default SyntaxRow;
