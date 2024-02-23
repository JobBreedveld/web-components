'use-strict'

class HomeText extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    console.log('home-text.js connectedCallback')

    this.render()
  }

  render() {
    console.log('home-text.js render()')

    this.shadowRoot.innerHTML = `
        <p>
          This is the home text component.
        </p>
    `
  }
}

customElements.define('home-text', HomeText)
