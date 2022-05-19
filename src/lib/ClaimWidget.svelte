<script>
  import TokenSelector from './TokenSelector.svelte'
  import Input from './Input.svelte'

  export let title = 'Claim subdomain'
  export let claimButtonText = 'Claim'
  export let nameLabel = 'Name'
  export let tokenLabel = 'Token'
  export let namePlaceholder = 'register-me'
  export let alchemyApiKey
  export let contractAddress

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
    const response = await fetch(`https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}/getNFTs?${searchParams.toString()}`, options)
    if (!response.statusCode == 200) {
      throw new Error('Unable to load NFTs')
    }

    const data = await response.json()

    const owned = data.ownedNfts
      .filter(nft => nft.contract.address.toLowerCase() === contractAddress.toLowerCase())
      .map(nft => nft.id.tokenId)

    return Promise.all(
      owned.map(tokenId => {
        const searchParams = new URLSearchParams({
          contractAddress,
          tokenId 
        })
        return fetch(`https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}/getNFTMetadata?${searchParams.toString()}`, options)
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

{#if !claimed}
  <section>
    <div class="header">
      <h1>{title}</h1>
      {#if connected}
        <p>Connected!</p>
      {:else}
        <button on:click={connectWallet} class="lesser-btn">Connect</button>
      {/if}
    </div>

    <div>
      <Input
        placeholder={namePlaceholder}
        label={nameLabel}
        bind:value={nameField}
        bind:hasError={nameHasError}
        highlightError={highlightNameError}
        validations={nameValidations}
        />

      <br />
      <label class:tokenError>{tokenLabel}:</label>
      <TokenSelector on:tokenSelected={selectToken} {tokens} />
    </div>
    <button class="main-btn" on:click={claim}>{claimButtonText}</button>
  </section>

{:else}
  <p>profile go here</p>
{/if}

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

  h1 {
    margin: 0;
  }

  div {
    width: 100%;
  }

.tokenError {
  color: red;
}

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

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

  .main-btn,
  .main-btn:disabled {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    height: var(--primaryBtnHeight, 64px);
    width: var(--primaryBtnWidth, 196px);
    margin: 0;

    background-color: #637fff;
    background: linear-gradient(256.24deg, #3D73FF -30.68%, rgba(121, 174, 255, 0.8) 23.64%, rgba(145, 142, 255, 0.75) 63.28%, rgba(87, 122, 255, 0.35) 97.37%);
    box-shadow: 0px 6px 60px rgba(134, 158, 255, 0.5);

    font-weight: 600;
    font-size: 18px;
    line-height: 23px;
    text-align: center;
    color: #ffffff;

    border-radius: 24px;
    border: none;
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
