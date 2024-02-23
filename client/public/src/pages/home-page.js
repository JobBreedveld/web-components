'use-strict'

class HomePage extends HTMLElement {
  constructor() {
    super()

    this._dependencies = ['home-text', 'home-counter']

    this.attachShadow({ mode: 'open' })
  }

  async connectedCallback() {
    console.log('home-page.js connectedCallback()')

    await this.loadDependencies()
    this.render()
  }

  disconnectedCallback() {
    console.log('home-page.js disconnectedCallback()')
  }

  /** Load the dependencies one level deep. Deeper dependencies should load
   * their own.
   *
   * @returns {Promise<void>}
   */
  loadDependencies() {
    console.log('home-page loadDependencies')

    this.dependencies.forEach((dependency) => {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = `/public/src/home/${dependency}.js`
      document.head.appendChild(script)
    })
  }

  get dependencies() {
    return this._dependencies
  }

  render() {
    console.log('home-page render()')

    /** Doesn't need a slot so we don't need a template. */
    this.shadowRoot.innerHTML = `
        <style>
          h1 {
            color: #333;
            font-size: 24px;
            margin: 0;
            padding: 24px;
            text-align: center;
          }
        </style>

        <h1>Home</h1>
        <p>Welcome to the Home page</p>

        ${this.dependencies.map(
          (dependency) => `<${dependency}></${dependency}>`
        )}
      `
  }
}

customElements.define('home-page', HomePage)
