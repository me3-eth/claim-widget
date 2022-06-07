import { html, css, LitElement } from 'lit'

export class Image extends LitElement {
  static properties = {
    alt: { type: String },
    src: { type: String },
    label: { type: String }
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

  render () {
    return html`
    <div>
      <img src=${this.src} width="97" height="97" alt=${this.alt} />
      <p>${this.label}</p>
    </div>
    `
  }
}

customElements.define('me3-image', Image)
