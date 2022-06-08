<script>
import '../../../src/demo.css'
import '@me3/claim-widget'
  //import { ClaimWidget } from '@me3/claim-widget'
  //import { mock } from '@depay/web3-mock'

  /*
  mock({
    blockchain: 'ethereum',
    accounts: {
      return: ['0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc']
    }
  })
  */
</script>

<main>
  <me3-claim-widget
    domain="me3.eth"
    />

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
