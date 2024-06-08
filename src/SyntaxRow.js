import React from 'react';
import SyntaxBox from './SyntaxBox';
import './styles.css';

const SyntaxRow = ({ title, details }) => {
    return (
        <div className="syntax-row">
            <h3>{title}</h3>
            <div className="syntax-column">
                {details.map((detail, index) => (
                    <SyntaxBox
                        key={index}
                        description={detail.description}
                        example={detail.example}
                        notes={detail.notes}
                        language={detail.language} // Pass the language prop to SyntaxBox
                    />
                ))}
            </div>
        </div>
    );
};

export default SyntaxRow;
