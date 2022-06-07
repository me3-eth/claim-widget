<svelte:options tag="me3-claim-widget" />

<script>
  import ClaimWidget from './lib/ClaimWidget.svelte'

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
</script>

<ClaimWidget
  {domain}
  {alchemyApi}
  {tokenContractAddress}
  {provider}
  {title}
  {description}
  {claimButtonText}
  {nameLabel}
  {tokenLabel}
  {namePlaceholder}
  bind:value
  {selectedToken}
  {showTokenSelector}
  {showDescription}
  {showClaimButton}
     />

<style global src="./index.css"></style>
