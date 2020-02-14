/* Shortcut to "querySelector". */
function $(s) { return document.querySelector(s); }

var notes = {};
var maxNote = -1;
var currentNote;

function renderNotes() {    
    let keys = Object.keys(window.notes),
        notes = $('#notes');

    notes.innerHTML = '';

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let val = window.notes[key];
        notes.innerHTML += '<div class="note" id="' + key + '">' + val + '</div>';
    }
} renderNotes();

/* Open note editor with initial text inserted into textarea. */
function openNote(initialText) {
    $('#input-note').value = initialText;
    $('#curtain').classList.remove('hidden');
}

/* Save new or edited note appropriately. */
function saveNote() {
    let note = $('#input-note');
    
    if (note.value.trim().length > 0) { // validate note's text
        if (currentNote) 
            window.notes[currentNote] = note.value;
        else window.notes['n' + ++maxNote] = note.value;
    }

    renderNotes();
    $('#curtain').classList.add('hidden'); // hide the curtain
    currentNote = null; // note is no longer open so...
}

/* Delete currently open note if any. */
function deleteNote() {
    if (currentNote) {
        delete window.notes[currentNote];
        renderNotes();
    }

    $('#curtain').classList.add('hidden'); // hide the curtain
    currentNote = null; // note is no longer open so...
}

/* Listen to every click on an existing note. */
document.addEventListener('click', function(e) {
    if ( !e.target.matches('.note') ) return;

    let note = e.target;
    currentNote = note.id;
    openNote(window.notes[currentNote]);
});
