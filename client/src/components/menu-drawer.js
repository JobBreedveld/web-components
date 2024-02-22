'use-strict'
const menuDrawerTemplate = document.createElement('template')
menuDrawerTemplate.innerHTML = `
  <style>
    :host {
      background: #ccc;
      padding: 1rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      max-width: 300px;
    }
  </style>

  <nav>
    <slot></slot>
  </nav>
`

class MenuDrawer extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(menuDrawerTemplate.content.cloneNode(true))
  }
}

customElements.define('menu-drawer', MenuDrawer)
