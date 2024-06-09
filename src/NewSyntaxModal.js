import React, { useState } from 'react';
import './NewSyntax.css';

const NewSyntaxModal = ({ onSubmit, onClose }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newExample, setNewExample] = useState('');
    const [newNotes, setNewNotes] = useState('');

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
        const newSyntax = {
            title: newTitle,
            example: newExample,
            notes: newNotes,
            language: 'javascript',
        };
        onSubmit(newSyntax);
        setNewTitle('');
        setNewExample('');
        setNewNotes('');
    };

    return (
        <div className="new-syntax-modal">
            <div className="new-syntax-modal-content">
                <h2>New Syntax</h2>
                <div className="input-group">
                    <label>Title:</label>
                    <input type="text" name="newTitle" value={newTitle} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label>Example:</label>
                    <textarea name="newExample" value={newExample} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                    <label>Notes:</label>
                    <textarea name="newNotes" value={newNotes} onChange={handleInputChange} />
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
