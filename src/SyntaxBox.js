import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './styles.css';

const SyntaxBox = ({ example, notes, language }) => {
    return (
        <div className="syntax-box">
            <SyntaxHighlighter language={language} style={docco}>
                {example}
            </SyntaxHighlighter>
            <p>{notes}</p>
        </div>
    );
};

export default SyntaxBox;
