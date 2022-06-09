import { html, css, LitElement } from 'lit'
import {classMap} from 'lit/directives/class-map.js'

export class Image extends LitElement {
  static properties = {
    alt: { type: String },
    src: { type: String },
    tokenId: { type: String, reflect: true },
    isSelected: { type: Boolean, reflect: true, attribute: 'is-selected' },
    label: { type: String },
    classes: {},
  }

  static styles = css`
  div {
    border: none;
    border-radius: 32px;
    opacity: 0.2;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
  }

  .highlight {
    opacity: 1;
  }

  img {
    border: none;
    border-radius: 32px;
  }

  .highlight img {
    box-shadow: 0px 6px 30px rgba(134, 158, 255, 0.5);
  }

  p {
    margin: 0;
    color: #515161;
  }
  `

  constructor() {
    super()
    this.isSelected = false
    this.classes = { highlight: this.isSelected }
    this.tokenId = '0'
    this.label = ''
  }

  _dispatchSelection (ev) {
    this.dispatchEvent(
      new CustomEvent('tokenselected', {
        detail: { tokenId: this.tokenId },
        bubbles: true,
      })
    )
  }

  render () {
    return html`
    <div class=${classMap(this.classes)} @click=${this._dispatchSelection}>
      <img src=${this.src} width="97" height="97" alt=${this.alt} />
      <p>${this.label}</p>
    </div>
    `
  }

  update (changedProps) {
    super.update(changedProps)

    if (changedProps.has('isSelected')) {
      this.classes = { highlight: this.isSelected }
    }
  }
}

customElements.define('me3-image', Image)
