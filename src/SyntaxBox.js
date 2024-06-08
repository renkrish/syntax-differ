import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './styles.css';

const SyntaxBox = ({ description, example, notes, language }) => {
    return (
        <div className="syntax-box">
            <SyntaxHighlighter language={language} style={darcula}>
                {example}
            </SyntaxHighlighter>
            <p>{description}</p>
            <p>{notes}</p>
        </div>
    );
};

export default SyntaxBox;
