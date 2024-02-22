'use-strict'
export { HomePage }

class HomePage extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
  }

  async connectedCallback() {
    console.log('home-page.js conntectedCallback')

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
        `
    await this.loadDependencies()
  }

  disconnectedCallback() {
    console.log('home-page.js disconnectedCallback')
  }

  /** Load the dependencies one level deep. Deeper dependencies should load
   * their own.
   *
   * @returns {Promise<void>}
   */
  async loadDependencies() {
    console.log('home-page loadDependencies')

    // await import('../components/menu-drawer.js')
    //   .then((module) => {
    //     // je gebruikt module dus niet eens direct (voor nu)
    //     this.shadowRoot.appendChild(document.createElement('menu-drawer'))
    //   })
    //   .catch((err) => console.error(err))
  }
}

customElements.define('home-page', HomePage)
