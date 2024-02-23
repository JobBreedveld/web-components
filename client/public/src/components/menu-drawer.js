'use-strict'

const menuDrawerTemplate = document.createElement('template')
menuDrawerTemplate.innerHTML = `
  <style>
    :host {
      background: #ccc;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      max-width: 300px;
      padding: 1rem;
    }
  </style>

  <slot></slot>
`

class MenuDrawer extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(menuDrawerTemplate.content.cloneNode(true))
  }
}

customElements.define('menu-drawer', MenuDrawer)
