import { html, css, LitElement } from 'lit'

export class Input extends LitElement {
  static properties = {
    label: { type: String },
    placeholder: { type: String },
    value: { type: String },
    domain: { type: String },
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
        />
        <span>.${this.domain}</span>
    </div>
    `
  }
}

customElements.define('me3-input', Input)
