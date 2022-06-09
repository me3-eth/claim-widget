import { html, css, LitElement } from 'lit'
import { until } from 'lit/directives/until.js';
import './image.js'

export class TokenSelector extends LitElement {
  static properties = {
    tokens: { type: Array },
    options: { type: Object },
    _currentlySelected: { state: true },
  }

  static styles = css`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 24px;

    max-width: 100%;
  }

  .token-form label {
    border: none;
    border-radius: 32px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
  }

  .token-form [type=radio] ~ p,
  .token-form [type=radio] ~ img {
    opacity: 0.2;
  }

  .token-form [type=radio] {
    margin: 0;
    padding: 0;
    -webkit-appearance: none;
    appearance: none;
  }

  .token-form [type=radio]:checked ~ p,
  .token-form [type=radio]:checked ~ img {
    opacity: 1;
  }

  .token-form img {
    border: none;
    border-radius: 32px;
  }

  .token-form [type=radio]:checked + img {
    box-shadow: 0px 6px 30px rgba(134, 158, 255, 0.5);
  }

  .token-form p {
    margin: 0;
    color: #515161;
  }
  `

  constructor () {
    super()
    this.tokens = null
    this.options = {}
    this._currentlySelected = null
  }

  setSelectedToken (tokenId) {
    return function () {
      this.dispatchEvent(
        new CustomEvent('tokenselected', {
          detail: { tokenId },
          bubbles: true,
        })
      )
    }
  }

  item ({ title, media, id: { tokenId } }) {
    return html`
    <li>
      <label @click=${this.setSelectedToken(tokenId)}>
        <input type="radio" name="token" value=${tokenId} />
        <img src=${media[0].gateway} width="97" height="97" alt=${title} />
        <p>#${parseInt(tokenId)}</p>
      </label>
    </li>
    `
  }

  render () {
    const tokenList = this.tokens
      .then(tokens => {
        return tokens.map(this.item.bind(this))
      })
      .catch(tokenLoadErr => {
        console.log({ tokenLoadErr })
        return []
      })

    return html`
    <form class="token-form">
      <ul>
        ${until(tokenList, html`<li>Loading</li>`)}
      </ul>
    </form>
    `
  }
}

customElements.define('me3-token-selector', TokenSelector)
