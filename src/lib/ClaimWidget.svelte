<svelte:options tag="me3-claim-widget" />

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

<style global type="text/css" src="./ClaimWidget.css">
</style>
