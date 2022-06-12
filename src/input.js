import { html, css, LitElement } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import { validate } from './lib/me3-protocol.js'
import './loading.js'

const VALIDATION_STATE = {
  IDLE: 0,
  SEARCHING: 1,
  VALID: 2,
  ERROR: 3
}

export class Input extends LitElement {
  static properties = {
    label: { type: String },
    placeholder: { type: String },
    value: { type: String },
    domain: { type: String },
    provider: { type: Object },
    disable: { type: Boolean },

    _validationDelay: { state: true },
    _inputRef: { state: true },
    _validationState: { state: true },
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
      text-align: left;
      outline: none;
      background: transparent;
      color: var(--me3-input-text-color, #1c1c33);
      margin: auto 0;
      padding: 0;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }

    .fake-input {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 8px;

      border-radius: var(--me3-input-border-radius, 16px);
      border: var(--me3-input-border, 1px solid #dedede);
      padding: var(--me3-input-padding, 16px);
      margin: var(--me3-input-margin, 0);
      background: var(--me3-input-background, #ffffff);
    }

    .fake-input > *,
    .fake-input input {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      font-family: 'Outfit';
    }

    .input-wrap {
      display: inline-grid;
      vertical-align: top;
      align-items: center;
      position: relative;
    }

    .input-wrap span {
      grid-area: 1/3;
    }

    .input-wrap::after,
    .input-wrap input {
      width: auto;
      min-width: 1ch;
      grid-area: 1/2;
      -webkit-appearance: none;
         -moz-appearance: none;
              appearance: none;
      resize: none;
    }

    .input-wrap::after {
      content: attr(data-value) "";
      visibility: hidden;
      white-space: pre-wrap;
    }

    .input-wrap input {
      width: 100%;
    }

    .state-icon {
      width: 24px;
    }
  `

  render() {
    return html`
    <label for=${this.id}>${this.label}</label>

    <div class="fake-input">
      <div style="display: flex;">
        <div class="input-wrap">
          <input
            size=${this.placeholder.length}
            ${ref(this._inputRef)}
            value=${this.value}
            type="text"
            placeholder=${this.placeholder}
            name=${this.id}
            id=${this.id}
            @input=${this._subdomainUpdate}
            ?disabled=${this.disable}
            />
        </div><span>.${this.domain}</span>
      </div>

      <div class="state-icon">
        ${this._showStateIcon(this._validationState)}
      </div>
    </div>
    `
  }

  constructor () {
    super()

    this.provider = null
    this.disable = false
    this._inputRef = createRef()
  }

  _showStateIcon (currentState) {
    let icon
    switch (currentState) {
      case VALIDATION_STATE.SEARCHING:
        icon = html`<me3-loading-icon />`
        break
      case VALIDATION_STATE.VALID:
        icon = html`yay`
        break
      case VALIDATION_STATE.ERROR:
        icon = html`boo`
        break
      default:
        icon = html``
    }

    return icon
  }

  _subdomainUpdate (ev) {
    const managedValue = this._inputRef.value.value.replaceAll(/[^a-z0-9]/ig, '')

    this._inputRef.value.value = managedValue
    this._inputRef.value.parentNode.dataset.value = managedValue || this.placeholder

    clearTimeout(this._validationDelay)

    const p = this.provider
    const domain = this.domain

    this._validationDelay = setTimeout(function () {

      this._validationState = VALIDATION_STATE.SEARCHING

      validate(domain, managedValue, { provider: p })
        .then(isValid => {
          this._validationState = VALIDATION_STATE.VALID
          if (isValid) this._sendUpdate(managedValue)
          else throw new Error('Invalid')
        })
        .catch(err => {
          console.log({ err })
          this._validationState = VALIDATION_STATE.ERROR
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
