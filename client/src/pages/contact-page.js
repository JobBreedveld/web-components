'use-strict'
export { ContactPage }

class ContactPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        h1 {
          color: #333;
          font-size: 24px;
          margin: 0;
          padding: 24px;
          text-align: center;
        }
      </style>

      <h1>Contact</h1>
      <p>Contact opnemen</p>
    `
  }
}

customElements.define('contact-page', ContactPage)
