import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useSyntax } from './SyntaxContext';
import { updateDetailExample, updateDetailNotes } from './dataUtils';
import './styles.css';

const SyntaxBox = ({ categoryIndex, subcategoryIndex, languageIndex }) => {
    const { data, setData } = useSyntax();

    const details = data.syntaxes[categoryIndex].subcategories[subcategoryIndex].details[languageIndex];
    const [isExampleEditing, setIsExampleEditing] = useState(false);
    const [editedExample, setEditedExample] = useState(details.example);

    const [isNotesEditing, setIsNotesEditing] = useState(false);
    const [editedNotes, setEditedNotes] = useState(details.notes);

    const handleExampleDoubleClick = () => {
        setIsExampleEditing(true);
    };

    const handleNotesDoubleClick = () => {
        setIsNotesEditing(true);
    };

    const handleExampleChange = (event) => {
        setEditedExample(event.target.value);
    };

    const handleNotesChange = (event) => {
        setEditedNotes(event.target.value);
    };

    const handleExampleBlur = () => {
        const updatedData = updateDetailExample(data, categoryIndex, subcategoryIndex, languageIndex, editedExample);
        setData(updatedData);
        setIsExampleEditing(false);
    };

    const handleNotesBlur = () => {
        const updatedData = updateDetailNotes(data, categoryIndex, subcategoryIndex, languageIndex, editedNotes);
        setData(updatedData);
        setIsNotesEditing(false);
    };

    return (
        <div className="syntax-box">
            <div className="syntax-box-content" onDoubleClick={handleExampleDoubleClick}>
                {isExampleEditing ? (
                    <textarea
                        value={editedExample}
                        onChange={handleExampleChange}
                        onBlur={handleExampleBlur}
                        autoFocus
                    />
                ) : (
                    <SyntaxHighlighter language={details.language} style={docco}>
                        {details.example}
                    </SyntaxHighlighter>
                )}
            </div>
            <div className="syntax-box-notes-container" onDoubleClick={handleNotesDoubleClick}>
                {isNotesEditing ? (
                    <textarea
                        value={editedNotes}
                        onChange={handleNotesChange}
                        onBlur={handleNotesBlur}
                        autoFocus
                    />
                ) : (
                    <p>{details.notes}</p>
                )}
            </div>
        </div>
    );
};

export default SyntaxBox;
