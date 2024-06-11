// ExportData.js
import React from 'react';
import { useSyntax } from './SyntaxContext';
import yaml from 'js-yaml';
import './styles.css';

const ExportData = () => {
    const {
        data,
        showYamlModal,
        generatedYaml,
        setGeneratedYaml,
        setShowYamlModal
    } = useSyntax();

    const generateYamlContent = () => {
        const generatedYaml = yaml.dump(data);
        setGeneratedYaml(generatedYaml);
        setShowYamlModal(true);
    };

    const closeYamlModal = () => {
        setShowYamlModal(false);
    };

    return (
        <>
            <button onClick={generateYamlContent} className="submit-button">
                SUBMIT
            </button>
            {showYamlModal && (
                <div className="export-data-container">
                    <div className="export-data-content">
                        <h2>Updated YAML Content</h2>
                        <textarea readOnly value={generatedYaml} className="export-data-yaml-text" />
                        <button onClick={closeYamlModal} className="close-modal-button">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExportData;
