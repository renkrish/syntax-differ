import React from 'react';
import './NewSyntax.css';

const NewSyntaxModal = ({
    show,
    newTitle,
    newExample,
    newNotes,
    handleNewSyntaxInputChange,
    handleSubmitNewSyntax,
    handleCloseNewSyntaxModal
}) => {
    if (!show) {
        return null;
    }

    return (
        <div className="new-syntax-modal">
            <div className="new-syntax-modal-content">
                <h2>New Syntax</h2>
                <div className="input-group">
                    <label>Title:</label>
                    <input type="text" name="newTitle" value={newTitle} onChange={handleNewSyntaxInputChange} />
                </div>
                <div className="input-group">
                    <label>Example:</label>
                    <textarea name="newExample" value={newExample} onChange={handleNewSyntaxInputChange} />
                </div>
                <div className="input-group">
                    <label>Notes:</label>
                    <textarea name="newNotes" value={newNotes} onChange={handleNewSyntaxInputChange} />
                </div>
                <div className="button-group">
                    <button onClick={handleSubmitNewSyntax}>Submit</button>
                    <button onClick={handleCloseNewSyntaxModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default NewSyntaxModal;
