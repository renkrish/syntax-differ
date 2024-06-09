import React, { useState } from 'react';
import SyntaxBox from './SyntaxBox';
import editIcon from './assets/edit_note.svg';
import './styles.css';

const SyntaxRow = ({ title, details, onTitleEdit, onDetailEdit }) => {
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
        onTitleEdit(editedTitle);
    };

    const handleSyntaxEdit = (index, newDetail) => {
        onDetailEdit(index, newDetail);
    };

    return (
        <div className="syntax-row">
            <div className="syntax-row-title">
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
                <img
                    src={editIcon}
                    alt="Edit"
                    className="edit-icon"
                    onClick={handleEditClick}
                />
            </div>
            <div className="syntax-column">
                {details.map((detail, index) => (
                    <SyntaxBox
                        key={index}
                        details={detail}
                        onEdit={(newDetail) => handleSyntaxEdit(index, newDetail)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SyntaxRow;
