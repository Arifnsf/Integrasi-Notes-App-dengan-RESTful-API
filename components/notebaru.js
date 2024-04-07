// Custom Elemen untuk NoteForm
class NoteBaru extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    constructor(){
        super();

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._style = document.createElement('style');

    }

    _updateStyle(){
        this._style.textContent = `
            note-form{
                display: block;
                justify-content: center;
                background-color: black;
                border-style: solid;
                border-color: red;
            }

            form{
                display: block;
                justify-content: center;
                background-image: linear-gradient(to right, #D862BC, #86469C); /* Ganti warna background dengan abu-abu muda */
                border-style: solid;
                border-color: #e0e0e0; /* Ganti warna border dengan abu-abu lebih muda */
                padding: 20px; /* Tambahkan padding untuk meningkatkan ruang di sekitar form */
                border-radius: 10px; /* Tambahkan sudut bulat pada form */
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            input[type = text]{
                width: 100%;
                border: 2px solid #608da2 ;
                border-radius: 4px;
                padding: 10px;
                box-sizing: border-box;
                font: 24px;
                margin-bottom: 20px;
            }
            textarea {
                font-family: poppins;
                width: 100%;
                border: 2px solid #608da2 ;
                border-radius: 4px;
                padding: 10px;
                box-sizing: border-box;
                font: 24px;
                margin-bottom: 20px; 
            }
            .action{
                background-image: linear-gradient(to left, #D862BC, #86469C);
                color: whitesmoke;
                padding: 10px 20px;
                border: none;
                border-radius: 0px;
                cursor: pointer;
      }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = "";
    }

    connectedCallback() {
        this.render();
        this._shadowRoot
          .querySelector("#formNote")
          .addEventListener("submit", this._handleSubmit.bind(this));
      }

    _handleSubmit(event) {
        event.preventDefault();

        const judulNote = this._shadowRoot.querySelector('#judulNote').value;
        const isiNote = this._shadowRoot.querySelector('#isiNote').value;

        const generatedID = generateID();

        const noteBaru = {
            id: generatedID,
            title: judulNote,
            body: isiNote
        }

          this.dispatchEvent(new CustomEvent("addNewNote", {detail : noteBaru }));

          this._shadowRoot.querySelector('#judulNote').value = "";
          this._shadowRoot.querySelector('#isiNote').value = "";
    }

    render(){
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <form class=form id="formNote">
                <div>
                <label for="judul">JUDUL:</label>
                    <input type="text" id="judulNote" name="judul" placeholder="Judul"></input>
                    <label for="deskripsi">DESKRIPSI:</label>
                    <textarea id="isiNote" name="isi" placeholder="Isi Note"></textarea>
                </div>
                <button class="action" type="submit"> Buat </button>
            </form>
        `;
    }
}

customElements.define('note-form', NoteBaru);

function generateID(){
  return +new Date();
}



