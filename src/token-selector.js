import { html, css, LitElement } from 'lit'
import { until } from 'lit/directives/until.js';
import './image.js'

export class TokenSelector extends LitElement {
  static properties = {
    tokens: { type: Array },
    options: { type: Object },
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
  `

  constructor () {
    super()
    this.tokens = null
    this.options = {}
  }

  handleTokenSelection (ev) {
    console.log({ ev })
  }

  item ({ title, media, id: { tokenId } }) {
    return html`
    <li>
      <me3-image
        alt=${title}
        src=${media[0].gateway}
        label="#${parseInt(tokenId)}"
        />
    </li>
    `
  }

  render () {
    const tokenList = this.tokens
      .then(tokens => {
        return tokens.map(this.item)
      })
      .catch(err => {
        console.log({ err })
        return []
      })

    return html`
    <ul>
      ${until(tokenList, html`<li>Loading</li>`)}
    </ul>
    `
  }
}

customElements.define('me3-token-selector', TokenSelector)
