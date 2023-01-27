### Mini widget

**Scenario:** You want to allow for subdomains to be minted at the same time that your NFT is minting

```jsx
import { createComponent } from '@lit-labs/react'
import * as cw from '@me3/claim-widget'

let subdomain = ''

function mint () {
  const tokenId = /* your token minting function */;

  cw.claim('me3.eth', subdomain, { authData: [tokenId] })
    .then(tx => tx.wait())
    .then(result => console.log({ result })
    .catch(claimErr => console.log({ claimErr })
}

const Me3ClaimWidget = createComponent({
  react: React,
  tagName: 'me3-claim-widget',
  elementClass: cw.ClaimWidget
})

<Me3ClaimWidget
  domain="me3.eth"
  provider={window.ethereum}
  alchemyapi={{ key: 'demo', env: 'mainnet' }}
  token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
  hide-token-selector="true"
  hide-description="true"
  hide-claim-btn="true"
  onSubdomainupdated{({ detail }) => subdomain = detail.value}
  />

<button onClick={mint}>Mint</button>
```
