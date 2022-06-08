import { html, css, LitElement } from 'lit'

export class ClaimButton extends LitElement {
  static properties = {
    disable: { type: Boolean },
    btnText: { type: String }
  }

  static styles = css`
    .main-btn,
    .main-btn:disabled {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      height: var(--me3-claimbtn-height, 64px);
      width: var(--me3-claimbtn-width, 196px);
      margin: 0;

      background: var(---me3-claimbtn-background, linear-gradient(256.24deg, #3D73FF -30.68%, rgba(121, 174, 255, 0.8) 23.64%, rgba(145, 142, 255, 0.75) 63.28%, rgba(87, 122, 255, 0.35) 97.37%));
      box-shadow: var(--me3-claimbtn-box-shadow, 0px 6px 60px rgba(134, 158, 255, 0.5));

      font-weight: 600;
      font-size: 18px;
      line-height: 23px;
      text-align: center;
      color: var(--me3-claimbtn-text-color, #ffffff);

      border-radius: var(--me3-claimbtn-border-radius, 24px);
      border: var(--me3-claimbtn-border, none);
    }

    .main-btn::before,
    .main-btn::after,
    .main-btn:disabled::before,
    .main-btn:disabled::after  {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      content: "";

      background: linear-gradient(to right, rgba(255,255,255,0.1) 0%,rgba(255,255,255,0) 100%);
      /*filter: drop-shadow(0px 6px 30px rgba(108, 108, 128, 0.06));*/

      color: #fff;
      text-decoration: none;

      opacity: 1;
      border-radius: 24px;

      transition: 0.2s;
    }

    .main-btn:hover::before,
    .main-btn:hover::after {
      opacity: 0;
    }

    .main-btn:disabled,
    .main-btn:disabled::before,
    .main-btn:disabled::after,
    .main-btn:disabled:hover::before,
    .main-btn:disabled:hover::after {
      opacity: 0.5;
    }
  `

  constructor () {
    super()

    this.disable = false
  }

  render () {
    return html`
      <button ?disabled=${this.disable} class="main-btn" >${this.btnText}</button>
    `
  }
}

customElements.define('me3-claim-button', ClaimButton)
