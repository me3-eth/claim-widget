import { html, css, LitElement } from 'lit'

export class ErrorIcon extends LitElement {
  static properties = {
    width: { type: String },
    height: { type: String },
    bgColor: { type: String },
    fgColor: { type: String },
  }

  constructor () {
    super()

    this.width = '24'
    this.height = '24'
    this.bgColor = '#ff5e75'
    this.fgColor = '#ffffff'
  }

  render () {
    return html`
    <svg xmlns="http://www.w3.org/2000/svg" width=${this.width} height=${this.height} fill="none" viewBox="0 0 24 24">
      <path fill="${this.bgColor}" fill-rule="evenodd" d="M17.208 0C21.276 0 24 2.856 24 7.104v9.805C24 21.144 21.276 24 17.208 24H6.804C2.736 24 0 21.144 0 16.91V7.103C0 2.856 2.736 0 6.804 0h10.404z" clip-rule="evenodd"/>
      <path fill="${this.fgColor}" fill-rule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L12 10.586l4.293-4.293a1 1 0 111.414 1.414L13.414 12l4.293 4.293a1 1 0 01-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 12 6.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
    </svg>
    `
  }
}

customElements.define('me3-error-icon', ErrorIcon)
