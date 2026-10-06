// 1. Select the required elements
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteCategory = document.getElementById('note-category');
const notesList = document.getElementById('notes-list');
const errorMessage = document.getElementById('error-message');
const noteCount = document.getElementById('note-count');
// New element for Task 5: the search input
const searchInput = document.getElementById('search-input');

// 2. State: Load notes from localStorage OR start with an empty array
let notes = JSON.parse(localStorage.getItem('quicknotes_data')) || [];

// Helper function to save notes to localStorage
function saveNotes() {
    localStorage.setItem('quicknotes_data', JSON.stringify(notes));
}

// 3. Update the note count message (always based on total notes)
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
    saveNotes(); // Save to localStorage after deleting
    renderNotes(); 
}

// 5. Render function (now accepts a filtered list for searching)
function renderNotes(notesToDisplay = notes) {
    notesList.innerHTML = '';
    
    // Check if the search found nothing
    if (notesToDisplay.length === 0 && searchInput.value.trim() !== '') {
        const noMatchMsg = document.createElement('li');
        noMatchMsg.textContent = "No notes match your search.";
        noMatchMsg.style.textAlign = 'center';
        noMatchMsg.style.color = '#777';
        noMatchMsg.style.padding = '20px';
        notesList.appendChild(noMatchMsg);
    } else {
        // Render normally
        notesToDisplay.forEach(note => {
            const li = document.createElement('li');
            li.className = `note-card category-${note.category.toLowerCase()}`;
            
            const textPara = document.createElement('p');
            textPara.textContent = note.text;
            
            const metaDiv = document.createElement('div');
            metaDiv.className = 'note-meta';
            
            const categorySpan = document.createElement('span');
            categorySpan.textContent = `[${note.category}]`;
            
            const dateSpan = document.createElement('span');
            dateSpan.textContent = note.createdAt;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteNote(note.id));
            
            metaDiv.appendChild(categorySpan);
            metaDiv.appendChild(dateSpan);
            metaDiv.appendChild(deleteBtn);
            
            li.appendChild(textPara);
            li.appendChild(metaDiv);
            
            notesList.appendChild(li);
        });
    }
    
    updateCount();
}

// 6. Handle form submission
noteForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const text = noteInput.value.trim();
    
    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        return; 
    }
    
    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return; 
    }
    
    errorMessage.textContent = "";
    
    const newNote = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };
    
    notes.push(newNote);
    saveNotes(); // Save to localStorage after adding
    
    // Reset search box if user adds a note while searching
    searchInput.value = '';
    
    renderNotes();
    noteInput.value = '';
});

// 7. Search functionality
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Filter notes that include the search term
    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(searchTerm)
    );
    
    // Re-render using only the filtered list
    renderNotes(filteredNotes);
});

// 8. Initial render when the page first loads
renderNotes();