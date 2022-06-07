import { html, css, LitElement } from 'lit'
import { nftApi } from './lib/me3-protocol.js'
import './header.js'
import './input.js'
import './token-selector.js'

export class ClaimWidget extends LitElement {
  static properties = {
    title: { type: String },
    description: { type: String },
    claimButtonText: { type: String },
    nameLabel: { type: String },
    tokenLabel: { type: String },
    namePlaceholder: { type: String },
    domain: { type: String },
    value: {},
    selectedToken: {},
    alchemyApi: { type: Object, attribute: 'alchemy-api' },
    tokenContractAddress: { type: String, attribute: 'token-address' },

    hideTokenSelector: { type: Boolean, attribute: 'hide-token-selector', reflect: true },
    hideDescription: { type: Boolean, attribute: 'hide-description', reflect: true },
    hideClaimButton: { type: Boolean, attribute: 'hide-claim-btn', reflect: true },

    tokens: { state: true },
  }

  constructor () {
    super();

    this.title = 'Register Your Subdomain'
    this.description = `Choose your subdomain for ${this.domain} and assign it to one of your NFTs. You'll also get a profile.`
    this.claimButtonText = 'Register'
    this.nameLabel = 'Subdomain'
    this.tokenLabel = 'NFT'
    this.namePlaceholder = 'brendan'

    this.hideDescription = false
    this.hideClaimButton = false
    this.hideTokenSelector = false
    this.alchemyApi = {}
    this.tokens = []
    this.tokenContractAddress = ''
  }

  render() {
    if (this.alchemyApi.key && this.alchemyApi.env) {
      this.tokens = nftApi(this.tokenContractAddress, '0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc', { alchemyApi: this.alchemyApi })
    } else {
      this.tokens = Promise.resolve([])
    }

    return html`
    <div>
      ${ this.hideDescription
        ? ''
        : html`<me3-header title=${this.title} description=${this.description} />`
      }

      <section>
        <me3-input
          domain=${this.domain}
          placeholder=${this.namePlaceholder}
          label=${this.nameLabel}
          />
      </section>

      ${ this.hideTokenSelector
        ? ''
        : html`
          <section>
            <me3-token-selector .tokens=${this.tokens} />
          </section>
          `
      }
    </div>
    `
  }
}

customElements.define('me3-claim-widget', ClaimWidget)
