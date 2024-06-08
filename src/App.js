import React from 'react';
import SyntaxDiffer from './SyntaxDiffer';

function App() {
    const languagesToShow = ['python', 'groovy', 'go']; // Specify the list of languages you want to display

    return (
        <div className='app-container'>
            <h1>Syntax Differences</h1>
            <SyntaxDiffer languages={languagesToShow} />
        </div>
    );
}

export default App;

