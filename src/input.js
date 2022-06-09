import { html, css, LitElement } from 'lit'
import { validate } from './lib/me3-protocol.js'

export class Input extends LitElement {
  static properties = {
    label: { type: String },
    placeholder: { type: String },
    value: { type: String },
    domain: { type: String },
    provider: { type: Object },

    _validationDelay: { state: true },
  }

  static styles = css`
    .error {
      border: 1px solid red;
    }

    label {
      display: var(--me3-label-display, block);
      margin: var(--me3-label-margin, 0 0 8px 0);
      font-size: var(--me3-label-font-size, 14px);
      line-height: var(--me3-label-line-height, 24px);
      font-weight: var(--me3-label-font-weight, 500);
    }

    input {
      border: 0;
      text-align: right;
      outline: none;
      width: 100%;
      background: transparent;
      color: var(--me3-input-text-color, #1c1c33);
      margin: 0;
      padding: 0;
    }

    .fake-input {
      display: flex;
      flex-direction: row;
      align-items: center;

      border-radius: var(--me3-input-border-radius, 16px);
      border: var(--me3-input-border, 1px solid #dedede);
      padding: var(--me3-input-padding, 16px);
      margin: var(--me3-input-margin, 0);
      background: var(--me3-input-background, #ffffff);
    }
  `

  render() {
    return html`
    <label for=${this.id}>${this.label}</label>

    <div class="fake-input">
      <input
        value=${this.value}
        type="text"
        placeholder=${this.placeholder}
        name=${this.id}
        id=${this.id}
        @input=${this._subdomainUpdate}
        />
        <span>.${this.domain}</span>
    </div>
    `
  }

  constructor () {
    super()

    this.provider = null
  }

  _subdomainUpdate (ev) {
    const { value } = ev.target

    clearTimeout(this._validationDelay)

    const p = this.provider
    const domain = this.domain

    this._validationDelay = setTimeout(function () {
      console.log({ p, value })

      validate(domain, value, { provider: p })
        .then(isValid => {
          if (isValid) this._sendUpdate(value)
          else throw new Error('Invalid')
        })
        .catch(err => {
          console.log({ err })
          // TODO set error state
        })
    }.bind(this), 1000)
  }

  _sendUpdate (value) {
    this.dispatchEvent(
      new CustomEvent('subdomainupdate', {
        detail: { value },
        bubbles: true,
      })
    )
  }
}

customElements.define('me3-input', Input)
