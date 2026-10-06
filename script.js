// 1. Select the required elements
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteCategory = document.getElementById('note-category');
const notesList = document.getElementById('notes-list');
// New elements for Task 4
const errorMessage = document.getElementById('error-message');
const noteCount = document.getElementById('note-count');

// 2. State: an array to hold our note objects
let notes = [];

// 3. Update the note count message
function updateCount() {
    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

// 4. Delete a note by its ID
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    renderNotes(); // Re-render the list after deleting
}

// 5. Render function to build the UI
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
        // Add event listener for the delete button
        deleteBtn.addEventListener('click', () => deleteNote(note.id));
        
        // Assemble the card
        metaDiv.appendChild(categorySpan);
        metaDiv.appendChild(dateSpan);
        metaDiv.appendChild(deleteBtn);
        
        li.appendChild(textPara);
        li.appendChild(metaDiv);
        
        // Add it to the page
        notesList.appendChild(li);
    });
    
    // Update the count message every time we render
    updateCount();
}

// 6. Handle form submission with Validation
noteForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const text = noteInput.value.trim();
    
    // Validation checks
    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        return; // Stop the function here
    }
    
    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return; // Stop the function here
    }
    
    // Clear the error message if validation passes
    errorMessage.textContent = "";
    
    // Create the note object
    const newNote = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };
    
    // Add to array and re-render
    notes.push(newNote);
    renderNotes();
    
    // Clear the input field
    noteInput.value = '';
});