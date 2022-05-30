<script>
  import { writable } from 'svelte/store'
  import { ethers } from 'ethers'
  import TokenSelector from './TokenSelector.svelte'
  import Input from './Input.svelte'
  import { claim, nftApi } from './me3-protocol'

  export let domain
  export let alchemyApi = { key: '', env: '' }
  export let tokenContractAddress
  export let provider = null

  // Text
  export let title = 'Register Your Subdomain'
  export let description = `Choose your subdomain for ${domain} and assign it to one of your NFTs. You'll also get a profile.`
  export let claimButtonText = 'Register'
  export let nameLabel = 'Subdomain'
  export let tokenLabel = 'NFT'
  export let namePlaceholder = 'brendan'
  export let value
  export let selectedToken

  // Section visibility
  export let showTokenSelector = true
  export let showDescription = true
  export let showClaimButton = true

  let tokens = []

  let signer
  $: {
    if (provider) {
      const p = new ethers.providers.Web3Provider(provider)
      signer = p.getSigner()
      signer.getAddress()
        .then(addr => nftApi(tokenContractAddress, addr, { alchemyApi })) // TODO unnecessary if not showing tokens
        .then(results => { tokens = results })
        .catch(() => { tokens = [] })
    }
  }

  let connected = false
  let claimed = false

  let nameHasError
  let highlightNameError = false
  let tokenError = false

  let nameValidations = [
    s => (/[a-z0-9]*/gi).test(s),
    s => s !== '',
  ]

  function selectToken ({ detail }) {
    selectedToken = detail.id
    if (tokenError) tokenError = false
  }

  function handleClaim () {
    if (nameHasError) {
      highlightNameError = true
      return
    }

    if (!selectedToken) {
      tokenError = true
      return
    }

    claim(domain, value, { provider })
  }
</script>

<div id="container">
  {#if showDescription}
    <header>
      <h2>{title}</h2>
      {#if description}
        <p>{description}</p>
      {/if}
    </header>
  {/if}

  <section>
    <Input
      {domain}
      placeholder={namePlaceholder}
      label={nameLabel}
      bind:value
      bind:hasError={nameHasError}
      highlightError={highlightNameError}
      validations={nameValidations}
      />
  </section>


  {#if showTokenSelector}
    <section>
      <label class:tokenError>{tokenLabel}</label>
      <TokenSelector on:tokenSelected={selectToken} {tokens} />
    </section>
  {/if}

  {#if showClaimButton}
    <button disabled={provider === null} class="main-btn" on:click={handleClaim}>{claimButtonText}</button>
  {/if}
</div>

<style>
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
    color: var(--me3-title-color, #1c1c33);
  }

  header p {
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    font-weight: 400;
    margin: 0;
    margin-top: 12px;
    color: var(--me3-description-color, #828499);
  }

  section {
    width: 100%;
  }

.tokenError {
  color: red;
}

  label {
    display: var(--me3-label-display, block);
    margin: var(--me3-label-margin, 0 0 8px 0);
    font-size: var(--me3-label-font-size, 14px);
    line-height: var(--me3-label-line-height, 24px);
    font-weight: var(--me3-label-font-weight, 500);
  }

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
