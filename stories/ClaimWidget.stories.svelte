<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import { action } from '@storybook/addon-actions'
  import { mock } from '@depay/web3-mock'
  import ClaimWidget from '../src/lib/ClaimWidget.svelte'

  mock({
    blockchain: 'ethereum',
    accounts: {
      return: ['0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc']
    }
  })
</script>

<Meta title="Claim Widget" component={ClaimWidget} />

<Story name="Default">
  <ClaimWidget
    tokenContractAddress="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
    domain="me3.eth"
    provider={global.ethereum}
    alchemyApi={{ key: 'hP76qJi6xsXDNJIxJxEWuDj6XkasUraf', env: 'mainnet' }}
    />
</Story>

<Story name="For new token mints">
  <ClaimWidget
    tokenContractAddress="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
    domain="me3.eth"
    showTokenSelector={false}
    showDescription={false}
    showClaimButton={false}
    />
</Story>
