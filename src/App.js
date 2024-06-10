import React from 'react';
import SyntaxDiffer from './SyntaxDiffer';
import { SyntaxProvider } from './SyntaxContext';

function App() {
    const languagesToShow = ['python', 'groovy', 'go']; // Specify the list of languages you want to display

    return (
        <div className='app-container'>
            <SyntaxProvider>
            <SyntaxDiffer languages={languagesToShow} />
        </SyntaxProvider>
        </div>
    );
}

export default App;

