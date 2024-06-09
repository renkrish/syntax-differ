import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import editIcon from './assets/edit_note.svg';
import './styles.css';

const SyntaxBox = ({ details, onEdit }) => {
    const [isExampleEditing, setIsExampleEditing] = useState(false);
    const [editedExample, setEditedExample] = useState(details.example);

    const [isNotesEditing, setIsNotesEditing] = useState(false);
    const [editedNotes, setEditedNotes] = useState(details.notes);

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
        onEdit({ ...details, example: editedExample });
    };

    const handleNotesBlur = () => {
        setIsNotesEditing(false);
        onEdit({ ...details, notes: editedNotes });
    };

    return (
        <div className="syntax-box">
            <div className="syntax-box-content">
                {isExampleEditing ? (
                    <textarea
                        value={editedExample}
                        onChange={handleExampleChange}
                        onBlur={handleExampleBlur}
                        autoFocus
                    />
                ) : (
                    <>
                        <img
                            src={editIcon}
                            alt="Edit Example"
                            className="edit-icon"
                            onClick={handleExampleEditClick}
                        />
                        <SyntaxHighlighter language={details.language} style={docco}>
                            {details.example}
                        </SyntaxHighlighter>
                    </>
                )}
            </div>
            <div className="syntax-box-notes-container">
                {isNotesEditing ? (
                    <textarea
                        value={editedNotes}
                        onChange={handleNotesChange}
                        onBlur={handleNotesBlur}
                        autoFocus
                    />
                ) : (
                    <>
                        <img
                            src={editIcon}
                            alt="Edit Notes"
                            className="edit-icon"
                            onClick={handleNotesEditClick}
                        />
                        <p>{details.notes}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default SyntaxBox;
