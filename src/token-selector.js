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
  `

  constructor () {
    super()
    this.tokens = null
    this.options = {}
    this._currentlySelected = null
  }

  handleTokenSelection (ev) {
    const { tokenId } = ev.detail

    this._currentlySelected = tokenId
  }

  item ({ title, media, id: { tokenId } }) {
    const isSelected = this._currentlySelected === tokenId

    return html`
    <li>
      <me3-image
        key=${tokenId}
        alt=${title}
        src=${media[0].gateway}
        tokenid=${tokenId}
        label="#${parseInt(tokenId)}"
        ?is-selected=${isSelected}
        />
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
    <ul @tokenselected=${this.handleTokenSelection}>
      ${until(tokenList, html`<li>Loading</li>`)}
    </ul>
    `
  }
}

customElements.define('me3-token-selector', TokenSelector)
