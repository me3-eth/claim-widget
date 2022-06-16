import { html, css, LitElement } from 'lit'

export class Header extends LitElement {
  static properties = {
    title: {},
    description: {}
  }

  static styles = css`
    header {
      width: 100%;
      position: relative;
      top: 0;
      left: 0;
    }

    header h2 {
      margin: 0;
      text-align: center;
      font-weight: 600;
      font-size: 28px;
      line-height: 35px;
      color: var(--me3-title-color, #1c1c33);
    }

    header p {
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      font-weight: 400;
      margin: 0;
      margin-top: 12px;
      color: var(--me3-description-color, #828499);
    }
  `

  render() {
    return html`
      <header>
        <h2>${this.title}</h2>
        ${ this.description
          ? html`<p>${this.description}</p>`
          : ''
        }
      </header>
    `
  }
}

customElements.define('me3-header', Header)
