import { html, css, LitElement } from 'lit'

export class LoadingIcon extends LitElement {
  static properties = {
    width: { type: String },
    height: { type: String },
    color: { type: String },
  }

  static styles = css`
  .loading {
    display: inline-block;
    padding: 0;
    margin: 0;
    width: var(--refresh-icon-width);
    height: var(--refresh-icon-height);
    animation: 0.75s linear 0s infinite normal none running rotation;
  }

  @keyframes rotation {
    0% { transform: rotate(0); }
    100% { transform: rotate(359deg); }
  }
  `

  constructor () {
    super()

    this.width = '32'
    this.height = '32'
    this.color = '#D3D3D9'
  }

  render () {
    return html`
    <div class="loading" style="--refresh-icon-width: ${this.width}px; --refresh-icon-height: ${this.height}px">
      <svg ${this.width} ${this.height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="${this.color}" d="M18.364 5.636L16.95 7.05A7 7 0 1019 12h2a9 9 0 11-2.636-6.364z"/>
      </svg>
    </div>
    `
  }
}

customElements.define('me3-loading-icon', LoadingIcon)
