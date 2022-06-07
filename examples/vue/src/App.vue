<script setup>
  import { onMounted } from 'vue'
  import '@me3/claim-widget'
  import mockFetch from './mockfetch.js'

  const mockNfts = [
    {
      url: 'https://eth-mainnet.alchemyapi.io/v2/abc123/getNFTs?owner=0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc',
      method: 'GET',
      status: 200,
      response: {
        ownedNfts: [
          {
            contract: { address: '0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1' },
            id: { tokenId: '0x1337' }
          },
          {
            contract: { address: '0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1' },
            id: { tokenId: '0x1338' }
          },
          {
            contract: { address: '0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1' },
            id: { tokenId: '0x1339' }
          },
        ]
      }
    },
    {
      url: 'https://eth-mainnet.alchemyapi.io/v2/abc123/getNFTMetadata?contractAddress=0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1&tokenId=',
      method: 'GET',
      status: 200,
      response: req => {
        const { searchParams } = req
        const tokenNum = parseInt(searchParams.tokenId)

        return {
          title: `Logo #${tokenNum}`,
          id: { tokenId: searchParams.tokenId },
          media: [{ gateway: `https://storageapi.fleek.co/19601a7e-4370-48a9-9b52-d66cb11fb2e5-bucket/fakeme3nft/${tokenNum}.jpg` }]
        }
      }
    }
  ]

  let provider
  onMounted(async () => {
    provider = window.ethereum
    mockFetch(mockNfts)
  })
</script>

<template>
  <me3-claim-widget
    domain="me3.eth"
    tokenContractAddress="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
    :provider="provider"
    :alchemyApi="{ key: 'abc123', env: 'rinkeby' }"
    />
</template>

<style>
@import '../../../src/demo.css';

#app {
  width: 420px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}
</style>
