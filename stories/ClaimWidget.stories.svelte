<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import { action } from '@storybook/addon-actions'
  import withMock from 'storybook-addon-mock'
  import { mock } from '@depay/web3-mock'
  import ClaimWidget from '../src/lib/ClaimWidget.svelte'

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

  mock({
    blockchain: 'ethereum',
    accounts: {
      return: ['0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc']
    }
  })

  let defaultValue = '', defaultSelectedToken = ''
</script>

<Meta title="Claim Widget" component={ClaimWidget} decorators={[withMock]} />

<Story name="Default" parameters={{mockData: defaultMockNfts }}>
  <div style="width: 420px;">
    <ClaimWidget
      tokenContractAddress="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
      domain="me3.eth"
      bind:value={defaultValue}
      bind:selectedToken={defaultSelectedToken}
      provider={global.ethereum}
      alchemyApi={{ key: 'abc123', env: 'mainnet' }}
      />
  </div>
  <div class="info-pane">
    <p><em>Bound values</em></p>
    <p>Subdomain: {defaultValue}</p>
    <p>Token: {defaultSelectedToken}</p>
  </div>
</Story>

<Story name="For new token mints">
  <div style="width: 420px;">
    <ClaimWidget
      tokenContractAddress="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
      domain="me3.eth"
      showTokenSelector={false}
      showDescription={false}
      showClaimButton={false}
      />
  </div>
</Story>

<Story name="Missing provider">
  <div style="width: 420px">
    <ClaimWidget
      tokenContractAddress="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
      domain="me3.eth"
      alchemyApi={{ key: 'abc123', env: 'mainnet' }}
      />
  </div>
</Story>

<style>
  .info-pane {
    position: absolute;
    top: 10px;
    right: 10px;
    min-width: 200px;
  }
</style>
