import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import editIcon from './assets/edit_note.svg';
import './styles.css';

const SyntaxBox = ({ example, notes, language, onExampleEdit, onNotesEdit }) => {
    const [isExampleEditing, setIsExampleEditing] = useState(false);
    const [editedExample, setEditedExample] = useState(example);

    const [isNotesEditing, setIsNotesEditing] = useState(false);
    const [editedNotes, setEditedNotes] = useState(notes);

    const handleExampleEditClick = () => {
        setIsExampleEditing(true);
    };

    const handleNotesEditClick = () => {
        setIsNotesEditing(true);
    };

    const handleExampleChange = (event) => {
        setEditedExample(event.target.value);
    };

    const handleNotesChange = (event) => {
        setEditedNotes(event.target.value);
    };

    const handleExampleBlur = () => {
        setIsExampleEditing(false);
        onExampleEdit(editedExample);
    };

    const handleNotesBlur = () => {
        setIsNotesEditing(false);
        onNotesEdit(editedNotes);
    };

    return (
        <div className="syntax-box">
            <div className="syntax-box-content">
                <img
                    src={editIcon}
                    alt="Edit Example"
                    className="edit-icon"
                    onClick={handleExampleEditClick}
                />
                {isExampleEditing ? (
                    <textarea
                        value={editedExample}
                        onChange={handleExampleChange}
                        onBlur={handleExampleBlur}
                        autoFocus
                    />
                ) : (
                    <SyntaxHighlighter language={language} style={docco}>
                        {example}
                    </SyntaxHighlighter>
                )}
            </div>
            <div className="syntax-box-notes-container">
                <img
                    src={editIcon}
                    alt="Edit Notes"
                    className="edit-icon"
                    onClick={handleNotesEditClick}
                />
                {isNotesEditing ? (
                    <textarea
                        value={editedNotes}
                        onChange={handleNotesChange}
                        onBlur={handleNotesBlur}
                        autoFocus
                    />
                ) : (
                    <p>{notes}</p>
                )}
            </div>
        </div>
    );
};

export default SyntaxBox;
