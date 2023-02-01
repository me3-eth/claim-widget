import { html, css, LitElement } from 'lit'
import { ethers } from 'ethers'

import { claim, nfts } from '@me3/claim-sdk'
import './header.js'
import './input.js'
import './token-selector.js'
import './claim-button.js'
import './icons/loading.js'

export class ClaimWidget extends LitElement {
  static properties = {
    title: { type: String },
    description: { type: String },
    claimButtonText: { type: String },
    nameLabel: { type: String },
    tokenLabel: { type: String },
    namePlaceholder: { type: String },
    domain: { type: String },
    alchemyapi: { type: Object, attribute: 'alchemy-api', reflect: true },
    provider: { type: Object },
    tokenContractAddress: { type: String, attribute: 'token-address', reflect: true },

    hideTokenSelector: { type: Boolean, attribute: 'hide-token-selector', reflect: true },
    hideDescription: { type: Boolean, attribute: 'hide-description', reflect: true },
    hideClaimButton: { type: Boolean, attribute: 'hide-claim-btn', reflect: true },

    tokens: { state: true },
    selectedToken: { state: true },
    chosenSubdomain: { state: true },
    formValid: { state: true },
    signer: { state: true },
    minting: { state: true },
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
    this.description = ''
    this.claimButtonText = 'Register'
    this.nameLabel = 'Subdomain'
    this.tokenLabel = 'NFT'
    this.namePlaceholder = 'brendan'

    this.hideDescription = false
    this.hideClaimButton = false
    this.hideTokenSelector = false

    this.alchemyapi = {}
    this.tokens = Promise.resolve([])
    this.tokenContractAddress = ''
    this.formValid = false

    this.provider = null // TODO should go into an observable in the future
    this.signer = null
    this.minting = false
  }

  handleClaim () {
    if (!this.selectedToken) {
      console.log('No token selected')
      return
    }

    if (!this.chosenSubdomain) {
      console.log('No valid subdomain provided')
      return
    }

    this.minting = true

    claim(this.domain, this.chosenSubdomain, { provider: this.provider })
      .then(result => console.log({ claimResult: result }))
      .catch(err => console.log({ claimErr: err }))
      .finally((function () {
        this.minting = false
      }).bind(this))
  }

  handleSelectedToken ({ detail }) {
    this.selectedToken = detail.tokenId
    this._updateFormValidity()
  }

  handleSubdomainUpdate ({ detail }) {
    this.chosenSubdomain = detail.value
    this._updateFormValidity()
    this.dispatchEvent(
      new CustomEvent('subdomainupdate', {
        detail,
        bubbles: true,
        composed: true
      })
    )
  }

  render() {
    this._tokensMemo.call(this)

    if (!this.description) {
      this.description = `Choose your subdomain for ${this.domain} and assign it to one of your NFTs. You'll also get a profile.`
    }

    return html`
    <div id="container">
      <img height="47" width="47" alt="me3 logo" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 40 40'%3e%3cpath fill='url(%23a)' fill-rule='evenodd' d='M0 28a16 16 0 0 0 3 5l6-3c3-2 5-5 5-8v-8a3 3 0 0 1 1-2h3l5 3 4-6-5-3-5-1-5 1c-3 2-4 5-4 8l-1 8a3 3 0 0 1-1 2l-6 4zm39-15-5 3-2 2v8c0 3-2 6-5 8s-6 1-9 0l-5-3a12 12 0 0 0 3-6l5 3h3l1-1 1-1v-8c0-3 2-6 5-8l6-3a16 16 0 0 1 2 6z' clip-rule='evenodd'/%3e%3cdefs%3e%3clinearGradient id='a' x1='44.3' x2='-15.2' y1='-25.8' y2='-6.9' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%233D73FF'/%3e%3cstop offset='.4' stop-color='%2379AEFF'/%3e%3cstop offset='.7' stop-color='%23918EFF'/%3e%3cstop offset='1' stop-color='%23577AFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e" />
      ${ this.hideDescription
        ? ''
        : html`<me3-header title=${this.title} description=${this.description} />`
      }

      <section>
        <me3-input
          @subdomainupdate=${this.handleSubdomainUpdate}
          domain=${this.domain}
          placeholder=${this.namePlaceholder}
          label=${this.nameLabel}
          style="width: 100%;"
          .provider=${this.provider}
          ?disable=${this.minting}
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
              ?disable=${this.minting}
              selected=${this.selectedToken}
              />
          </section>
          `
      }

      ${ this.hideClaimButton
        ? ''
        : html`
          <section>
            <me3-claim-button
              @click="${this.handleClaim}"
              ?disable=${this.formValid === false || this.minting}
              >
              ${this.minting ? html`<me3-loading-icon />` : this.claimButtonText}
            </me3-claim-button>
          </section>
          `
      }
    </div>
    `
  }

  _tokensMemo () {
    this.tokens
      .then(tokens => {
        if (tokens.length > 0 || this.hideTokenSelector) return

        if (!this.provider) throw new Error('Missing provider attribute')
        if (!ethers.providers.Provider.isProvider(this.provider)) throw new Error('Must provide an EIP-1193, EIP-1102, EIP-3085 and EIP-3326 compliant provider')

        const signer = this.provider.getSigner()

        if (this.alchemyapi.key && this.alchemyapi.env && this.tokenContractAddress) {
          this.tokens = signer.getAddress()
            .then(walletAddr => nfts(this.tokenContractAddress, walletAddr, { alchemyApi: this.alchemyapi }))
        } else {
          this.tokens = Promise.resolve([])
        }
      })
  }

  _updateFormValidity () {
    this.formValid = !!this.chosenSubdomain && !!this.selectedToken
  }
}

customElements.define('me3-claim-widget', ClaimWidget)
