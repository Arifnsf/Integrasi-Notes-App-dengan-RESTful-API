//Custom Element untuk NoteItem
class Wrap extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
  };
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  set note(value) {
    this._note = value;

    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  get getNote() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
    .list {
      display: grid;
      grid-template-columns: auto auto auto auto;
      grid-template-rows: auto;
      gap: 20px;
      padding: 20px;
      border-radius: 10px;
  }
  
  .card, .note-item {
      padding: 20px;
      border-radius: 10px;
      background-color: #FB9AD1;
      box-shadow: 0 4px 8px black;
      transition: box-shadow 0.3s ease;
  }
  
  .card {
      border: 2px solid black;
  }
  
  .note-item {
      border: 2px solid #FFC107;
      background-color: black;
  }
  
  .note__judul, .isi_note {
      margin-block-start: 0;
      margin-block-end: 1rem;
      font-size: 18px;
      font-weight: normal;
      color: #555;
  }
  
  .note__judul {
      font-size: 24px;
      font-weight: bold;
      color: #333;
  }
  
  .action {
      cursor: pointer;
      width: fit-content;
      padding: 10px 20px;
      border: 2px solid #FF5722;
      color: #FF5722;
      font-size: 16px;
      border-radius: 20px;
  }
  
  .action:hover {
      background-color: #FF5722;
      color: #fff;
  }
  
  /* Media queries untuk layar dengan lebar maksimum 768px */
  @media only screen and (max-width: 768px) {
      .list {
          grid-template-columns: auto auto; /* Mengubah menjadi 2 kolom untuk layar lebih kecil */
      }
  }    
        `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    // const note = this._note;
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        
            <div class="list">
            ${this._note
              .map(
                (note) => `
                    <div class="card">
                        <div id = "noteItem" data-id="${note.id}">
                            <h2 class="note__judul">${note.title}</h2>
                            <p class="isi_note">${note.body}</p>
                            <div>
                                <button class=action id=""${note.id}>Hapus Note</button>
                            </div>
                        </div>
                    </div>
                    `
              )
              .join("")}
            </div>
        
        `;
  }
}

customElements.define("note-item", Wrap);
