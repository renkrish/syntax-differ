
export const getSubcategory = (data, categoryIndex, subcategoryIndex) => {
    return data.syntaxes[categoryIndex].subcategories[subcategoryIndex];
};

export const updateSubcategoryTitle = (data, categoryIndex, subcategoryIndex, newTitle) => {
    const updatedData = { ...data };
    updatedData.syntaxes[categoryIndex].subcategories[subcategoryIndex].title = newTitle;
    return updatedData;
};

export const updateDetailExample = (data, categoryIndex, subcategoryIndex, languageIndex, newExample) => {
    const updatedData = { ...data };
    updatedData.syntaxes[categoryIndex].subcategories[subcategoryIndex].details[languageIndex].example = newExample;
    return updatedData;
};

export const updateDetailNotes = (data, categoryIndex, subcategoryIndex, languageIndex, newNotes) => {
    const updatedData = { ...data };
    updatedData.syntaxes[categoryIndex].subcategories[subcategoryIndex].details[languageIndex].notes = newNotes;
    return updatedData;
};

export const insertDummySubcategory = (data, languages, categoryIndex, subcategoryIndex) => {
    // Create a copy of the data
    const updatedData = { ...data };

    // Get the category from the data
    const category = updatedData.syntaxes[categoryIndex];

    // Create a dummy subcategory
    const dummySubcategory = {
        title: "Double click to edit Title",
        details: languages.map(language => ({ language, example: "{\n  Double click to add an example\n}", notes: "Double click to update note" })),
    };

    // Insert the dummy subcategory at the specified index
    category.subcategories.splice(subcategoryIndex + 1, 0, dummySubcategory);

    return updatedData;
};


export const deletedSubcategory = (data, categoryIndex, subcategoryIndex) => {
    // Clone the data to avoid mutating the original object
    const updatedData = JSON.parse(JSON.stringify(data));

    // Get the category from the data
    const category = updatedData.syntaxes[categoryIndex];

    // Check if the subcategory index is within the bounds
    if (subcategoryIndex >= 0 && subcategoryIndex < category.subcategories.length) {
        // Remove the subcategory at the specified index
        category.subcategories.splice(subcategoryIndex, 1);
    } else {
        throw new Error('Invalid subcategory index');
    }

    return updatedData;
};
