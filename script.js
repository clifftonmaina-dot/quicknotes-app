// 1. Select the required elements
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteCategory = document.getElementById('note-category');
const notesList = document.getElementById('notes-list');

// 2. State: an array to hold our note objects
let notes = [];

// 3. Render function to build the UI
function renderNotes() {
    // Clear the current list
    notesList.innerHTML = '';
    
    // Loop through the notes array and build elements
    notes.forEach(note => {
        // Create the main card (<li>)
        const li = document.createElement('li');
        li.className = `note-card category-${note.category.toLowerCase()}`;
        
        // Create the text paragraph
        const textPara = document.createElement('p');
        textPara.textContent = note.text;
        
        // Create the metadata container (category, date, delete btn)
        const metaDiv = document.createElement('div');
        metaDiv.className = 'note-meta';
        
        const categorySpan = document.createElement('span');
        categorySpan.textContent = `[${note.category}]`;
        
        const dateSpan = document.createElement('span');
        dateSpan.textContent = note.createdAt;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        
        // Assemble the card
        metaDiv.appendChild(categorySpan);
        metaDiv.appendChild(dateSpan);
        metaDiv.appendChild(deleteBtn);
        
        li.appendChild(textPara);
        li.appendChild(metaDiv);
        
        // Add it to the page
        notesList.appendChild(li);
    });
}

// 4. Handle form submission
noteForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload
    
    // Create the note object
    const newNote = {
        id: Date.now(),
        text: noteInput.value.trim(),
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };
    
    // Add to array and re-render
    notes.push(newNote);
    renderNotes();
    
    // Clear the input field
    noteInput.value = '';
});