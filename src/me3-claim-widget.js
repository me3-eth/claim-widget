import { html, css, LitElement } from 'lit'
import { claim, nftApi } from './lib/me3-protocol.js'
import './header.js'
import './input.js'
import './token-selector.js'
import './claim-button.js'

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
    alchemyapi: { type: Object, attribute: 'alchemy-api', reflect: true },
    tokenContractAddress: { type: String, attribute: 'token-address', reflect: true },

    hideTokenSelector: { type: Boolean, attribute: 'hide-token-selector', reflect: true },
    hideDescription: { type: Boolean, attribute: 'hide-description', reflect: true },
    hideClaimButton: { type: Boolean, attribute: 'hide-claim-btn', reflect: true },

    tokens: { state: true },
  }

  static styles = css`
    #container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--me3-container-item-gap, 32px);

      background: var(--me3-container-background, linear-gradient(257.35deg, #FFFFFF 0%, rgba(255, 255, 255, 0.25) 100%));
      padding: var(--me3-container-padding, 40px 30px);
      border-radius: var(--me3-container-border-radius, 40px);
      box-shadow: var(--me3-container-box-shadow, 0px 6px 30px rgba(108, 108, 128, 0.06));
      width: 100%;
    }

    section {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  `

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
    this.alchemyapi = {}
    this.tokens = []
    this.tokenContractAddress = ''
  }

  handleClaim () {
    claim(this.domain, '', { provider: this.provider })
      .then(tx => tx.wait())
      .then(result => console.log({ claimResult: result }))
      .catch(err => console.log({ claimErr: err }))
  }

  handleSelectedToken ({ detail }) {
    const { tokenId } = detail
    console.log({ tokenId })
  }

  render() {
    if (this.alchemyapi.key && this.alchemyapi.env && this.tokenContractAddress) {
      this.tokens = nftApi(this.tokenContractAddress, '0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc', { alchemyApi: this.alchemyapi })
    } else {
      this.tokens = Promise.resolve([])
    }

    return html`
    <div id="container">
      ${ this.hideDescription
        ? ''
        : html`<me3-header title=${this.title} description=${this.description} />`
      }

      <section>
        <me3-input
          domain=${this.domain}
          placeholder=${this.namePlaceholder}
          label=${this.nameLabel}
          style="width: 100%;"
          />
      </section>

      ${ this.hideTokenSelector
        ? ''
        : html`
          <section>
            <me3-token-selector
              @tokenselected=${this.handleSelectedToken}
              style="width: 100%;"
              .tokens=${this.tokens}
              />
          </section>
          `
      }

      ${ this.hideClaimButton
        ? ''
        : html`
          <section>
            <me3-claim-button @click="${this.handleClaim}" btnText="Claim" />
          </section>
          `
      }
    </div>
    `
  }
}

customElements.define('me3-claim-widget', ClaimWidget)
