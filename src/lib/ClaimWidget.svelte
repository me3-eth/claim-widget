<script>
  import { ethers } from 'ethers'
  import TokenSelector from './TokenSelector.svelte'
  import Input from './Input.svelte'

  // Text
  export let title = 'Claim subdomain'
  export let claimButtonText = 'Claim'
  export let nameLabel = 'Name'
  export let tokenLabel = 'Token'
  export let namePlaceholder = 'register-me'

  export let domain
  export let alchemyApi = { key: '', env: '' }
  export let tokenContractAddress
  export let provider
  export let me3 = { authoriser: '', rules: '' }

  // Section visibility
  export let showTokenSelector = true
  export let showDescription = true
  export let showClaimButton = true

  let tokens = []

  let nameField
  let selectedToken
  let connected = false
  let claimed = false

  let nameHasError
  let highlightNameError = false
  let tokenError = false

  let connectedWallet = {
    address: '0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc'
  }

  let nameValidations = [
    s => (/[a-z0-9]*/gi).test(s),
    s => s !== '',
  ]

  function selectToken ({ detail }) {
    selectedToken = detail.id
    if (tokenError) tokenError = false
  }

  function claim () {
    if (nameHasError) {
      highlightNameError = true
      return
    }

    if (!selectedToken) {
      tokenError = true
      return
    }

    claimed = true
  }

  async function connectWallet (ev) {
    tokens = (await nftApi()).map(nft => ({
      url: nft.metadata.image,
      tokenId: nft.id.tokenId,
      title: nft.metadata.description
    }))

    connected = true
  }

  async function nftApi () {
    const options = { mode: 'cors', method: 'GET', redirect: 'follow' }

    const searchParams = new URLSearchParams({
      owner: connectedWallet.address
    })
    const response = await fetch(`https://eth-${alchemyApi.env}.alchemyapi.io/v2/${alchemyApi.key}/getNFTs?${searchParams.toString()}`, options)
    if (!response.statusCode == 200) {
      throw new Error('Unable to load NFTs')
    }

    const data = await response.json()

    const owned = data.ownedNfts
      .filter(nft => nft.contract.address.toLowerCase() === tokenContractAddress.toLowerCase())
      .map(nft => nft.id.tokenId)

    return Promise.all(
      owned.map(tokenId => {
        const searchParams = new URLSearchParams({
          contractAddress: tokenContractAddress,
          tokenId 
        })
        return fetch(`https://eth-${alchemyApi.env}.alchemyapi.io/v2/${alchemyApi.key}/getNFTMetadata?${searchParams.toString()}`, options)
          .then(response => {
            if (!response.ok) {
              throw new Error('Unable to get metadata')
            }

            return response.json()
          })
      })
    )
  }

</script>

<div id="container">
  {#if showDescription}
    <header>
      <h2>Register Your Subdomain</h2>
      <p>Choose your subdomain for {domain} and assign it to one of your NFTs. You'll also get a profile.</p>
    </header>
  {/if}

  <div>
    <Input
      {domain}
      placeholder={namePlaceholder}
      label={nameLabel}
      bind:value={nameField}
      bind:hasError={nameHasError}
      highlightError={highlightNameError}
      validations={nameValidations}
      />


    {#if showTokenSelector}
      <br />
      <label class:tokenError>{tokenLabel}:</label>
      <TokenSelector on:tokenSelected={selectToken} {tokens} />
    {/if}
  </div>

  {#if showClaimButton}
    <button class="main-btn" on:click={claim}>{claimButtonText}</button>
  {/if}
</div>

<style>
  section {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0px 6px 30px rgba(108, 108, 128, 0.06);
    padding: 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
  }

  #container {
    background: var(--me3-container-background, --gradient-background-card);
    padding: var(--me3-container-padding, 30px 20px);
    border-radius: var(--me3-container-border-radius, 40px);
    box-shadow: var(--me3-container-box-shadow, 0px 6px 30px rgba(108, 108, 128, 0.06));
    width: 100%;
  }

  #container header {
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
    height: var(--header-height);
  }

  header h2 {
    margin: 0;
    text-align: center;
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
    color: var(--me3-text-color, #1C1C33);
  }

  header p {
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    margin: 0;
    margin-top: 12px;
    color: var(--color-text-secondary);
  }

.tokenError {
  color: red;
}

  /*
  .lesser-btn {
    --gradient-lesser-button: linear-gradient(257.35deg, #FFFFFF 0%, rgba(255, 255, 255, 0.25) 100%);

    background: var(--gradient-lesser-button);
    border-radius: 24px;
    backdrop-filter: blur(24px);
    text-align: center;
    font-size: 18px;
    width: var(--lesser-btn-width);
    height: var(--lesser-btn-height);
    border: none;
    padding: var(--lesser-btn-padding);
    margin: 0;
    filter: drop-shadow(0px 6px 30px rgba(108, 108, 128, 0.06));
  }

  .lesser-btn:hover {
    box-shadow: 0px 6px 30px rgba(108, 108, 128, 0.06);
  }
  */

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
</style>
