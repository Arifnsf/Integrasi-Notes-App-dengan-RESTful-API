class headerApp extends HTMLElement {
    constructor(){
        super();

        this._style = document.createElement('style');
    }

    updateStyle(){
        this._style.textContent=`
        header {
            background-image: linear-gradient(to bottom, #000000 , #86469C);
            text-align: center;
            padding: 30px;
            color: white;
            width: 100%; 
          }
        `;
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.updateStyle();
        this.innerHTML = `
            ${this._style.outerHTML}
            <header>
        <div id="header">
            <h1>NOTE APP</h1>
            <blockquote cite="https://accurate.id/teknologi/notepad-adalah/">
                <p>
                <p>
                    Suatu aplikasi untuk membuat catatan kecil atau catatan sederhana yang kemudian bisa di edit dan dilihat kembali.
                </p>
                </p>
            </blockquote>
        </div>
    </header>
        `;
    }
}

customElements.define('nav-header', headerApp);