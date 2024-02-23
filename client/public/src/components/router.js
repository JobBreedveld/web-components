'use strict'

import { match } from '../utils/match.js'

const routerTemplate = document.createElement('template')
routerTemplate.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-grow: 1;
    }
  </style>

  <slot></slot>
  `

class Router extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(routerTemplate.content.cloneNode(true))
  }
  /**
   * Router looks for a main tag for updating the views on history updates.
   * Example:
   *
   * <wc-router>
   *  <maint>
   *    <!-- All DOM update will be happening here on route change -->
   *  </main>
   * </wc-router>
   */
  get outlet() {
    return this.querySelector('main')
  }

  get root() {
    return window.location.pathname
  }

  /**
   * @todo: update this text -> Get all routes from the direct wc-route child element.
   * The document title can be updated by providing an
   * title attribute to the wc-route tag
   */
  get routes() {
    return [
      {
        path: '/',
        component: 'home-page',
        title: 'Home',
        resourceUrl: '../pages/home-page.js',
      },
      {
        path: '/contact',
        component: 'contact-page',
        title: 'Contact',
        resourceUrl: '../pages/contact-page.js',
      },
      {
        path: '/about',
        component: 'about-page',
        title: 'About',
        resourceUrl: '../pages/about-page.js',
      },
    ]
  }

  connectedCallback() {
    this.updateLinks()
    this.navigate(window.location.pathname)

    window.addEventListener('popstate', this._handlePopstate)
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._handlePopstate)
  }

  _handlePopstate = () => {
    this.navigate(window.location.pathname)
  }

  updateLinks() {
    /**
     * Find all child link elements with route attribute to update the
     * href with route attribute value.
     *
     * Add custom click event handler to prevent the default
     * behaviour and navigate to the registered route onclick.
     */
    this.querySelectorAll('a[route]').forEach((link) => {
      const target = link.getAttribute('route')
      link.setAttribute('href', target)
      link.onclick = (e) => {
        e.preventDefault()
        this.navigate(target)
      }
    })
  }

  navigate(url) {
    const matchedRoute = match(this.routes, url)
    if (matchedRoute !== null) {
      this.activeRoute = matchedRoute
      window.history.pushState(null, null, url)
      this.update()
    }
  }

  /**
   * Update the DOM under outlet based on the active
   * selected route.
   */
  update() {
    const {
      component,
      title,
      params = {},
      resourceUrl = null,
    } = this.activeRoute

    if (component) {
      // Remove all child nodes under outlet element
      while (this.outlet.firstChild) {
        this.outlet.removeChild(this.outlet.firstChild)
      }

      const updateView = () => {
        const view = document.createElement(component)
        document.title = title || document.title
        for (let key in params) {
          /**
           * all dynamic param value will be passed
           * as the attribute to the newly created element
           * except * value.
           */
          if (key !== '*') view.setAttribute(key, params[key])
        }

        this.outlet.appendChild(view)
        // Update the route links once the DOM is updated
        this.updateLinks()
      }

      if (resourceUrl !== null) {
        import(resourceUrl).then(updateView)
      } else {
        updateView()
      }
    }
  }

  go(url) {
    this.navigate(url)
  }

  back() {
    window.history.go(-1)
  }
}

customElements.define('wc-router', Router)
