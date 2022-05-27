import './demo.css'

import ClaimWidget from './lib/ClaimWidget.svelte'

const app = new ClaimWidget({
  target: document.querySelector('main'),
  props: {
    contractAddress: '0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1',
    alchemyApi: { key: 'hP76qJi6xsXDNJIxJxEWuDj6XkasUraf', env: 'mainnet' },
    domain: 'demo.eth',
    provider: null
  }
})

export default app

