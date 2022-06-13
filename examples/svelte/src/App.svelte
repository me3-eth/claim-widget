<script>
  import '../../../src/demo.css'
  import { anything, mock } from '@depay/web3-mock'
  import registrarAbi from '../../../tests/Registrar.json'
  import faker from 'storybook-addon-mock/dist/utils/faker.js'
  import readme from '../README.md'
  import SvelteMarkdown from 'svelte-markdown'

  import '@me3/claim-widget'

  mock({
    blockchain: 'ethereum',
    transaction: {
      to: '0x9f2daf90c4323b529c31a40520a5fa63eb601b84',
      api: registrarAbi.abi,
      method: 'register',
      params: ['0x868437061435f35898f8ed7fb95d62ca53b460f0bb9d1c6be3bfd796e38d8636', anything, '0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc', []]
    },
    call: {
      to: '0x9f2daf90c4323b529c31a40520a5fa63eb601b84',
      api: registrarAbi.abi,
      method: 'valid',
      params: ['0x868437061435f35898f8ed7fb95d62ca53b460f0bb9d1c6be3bfd796e38d8636', anything],
      return: true
    },
    accounts: { return: ['0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc'] }
  })

  const metadataMock = {
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

  const defaultMockNfts = [
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
    metadataMock
  ]

  faker.makeInitialRequestMap(defaultMockNfts)
</script>

<main>
  <section>
    <div>
      <h1>Full widget</h1>

      <me3-claim-widget
        domain="me3.eth"
        provider={window.ethereum}
        alchemy-api={{ key: 'abc123', env: 'mainnet' }}
        token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
        />
    </div>

    <div>
      <h1>Mini widget</h1>
    </div>
  </section>

  <section>
    <SvelteMarkdown source={readme} />
  </section>
</main>

<style>
	main {
		padding: 1em;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
      width: 420px;
		}
	}
</style>
