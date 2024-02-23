'use-strict'

export { AboutPage }

class AboutPage extends HTMLElement {
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

      <h1>About</h1>
      <p>About</p>
    `
  }
}

customElements.define('about-page', AboutPage)
