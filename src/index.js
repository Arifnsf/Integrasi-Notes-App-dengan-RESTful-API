import './assets/styles.css';
import '../components/notebaru.js';
import '../components/wrap.js';
import '../components/headerApp.js';
import notes from './data/dumi.js';

document.addEventListener('DOMContentLoaded', () => {

  const noteList = document.getElementById('note-list');
  notes.forEach((note) => {
    const noteElement = document.createElement('note-item');
    noteElement.dataset.id = note.id;
    noteElement.dataset.title = note.title;
    noteElement.dataset.body = note.body;
    noteList.appendChild(noteElement);
  });

  const submitNote = document.querySelector('note-form');
  if (submitNote) {
    submitNote.addEventListener("addNewNote", (event) => {
      const noteBaru = event.detail;
      addNote(noteBaru);
      event.preventDefault();
    });
  }

  getNote();
  
});


const baseUrl = 'https://notes-api.dicoding.dev/v2';

const renderAllNotes = (notes) => {
  const noteItems = document.querySelectorAll('note-item');
  
  noteItems.forEach((noteItem, index) => {
    noteItem.note = notes;
    const shadowRoot = noteItem.shadowRoot;

    const itemnotes = shadowRoot.querySelectorAll('.card');
    itemnotes.forEach((itemnote, index) => {
      const deleteButton = itemnote.querySelector('.action');

      if (deleteButton) {
        deleteButton.addEventListener("click", () => {
          removeNote(noteItem.getNote[index].id);
        });
      }

    });
  });
};

const getNote = () => {
  fetch(`${baseUrl}/notes`)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        console.log(responseJson.data);
        renderAllNotes(responseJson.data);
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const addNote = (note) => {
  fetch(`${baseUrl}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": "12345",
    },
    body: JSON.stringify({ title: note.title, body: note.body }),
  })
    .then((response) => {
      console.log("addNote", response);
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      if (!responseJson.error) {
        getNote();
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const removeNote = (noteId) => {
  fetch(`${baseUrl}/notes/${noteId}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      getNote();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const showResponseMessage = (message = "Check your internet connection") => {
  alert(message);
};