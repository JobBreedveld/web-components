'use-strict'

class HomeCounter extends HTMLElement {
  static observedAttributes = ['count']

  constructor() {
    super()

    this._count = 7

    this.attachShadow({ mode: 'open' })
    this.render()
  }

  connectedCallback() {
    console.log('home-counter.js connectedCallback')

    this.render()

    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this._count++
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute ${name} has changed from ${oldValue} to ${newValue}.`
    )
  }

  get count() {
    return this._count
  }

  set count(value) {
    this._count = value
  }

  render() {
    console.log('home-counter.js render()')

    this.shadowRoot.innerHTML = `
      <p>
        This is the home counter.
      </p>

      <span>${this._count}</span>
      <button onclick="this.count++">Add</button>
    `
  }
}

customElements.define('home-counter', HomeCounter)
