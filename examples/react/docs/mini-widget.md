### Mini widget

**Scenario:** Claim a subdomain in the same function as a token mint

```jsx
import { ethers } from 'ethers'
import { createComponent } from '@lit-labs/react'
import * as me3 from '@me3/claim-widget'

let subdomain = ''

function mint () {
  /* your token minting function */
  const tokenId = () => {}

  me3.claim('me3.eth', subdomain, { authData: [tokenId] })
    .then(result => console.log({ result })
    .catch(claimErr => console.log({ claimErr })
}

const Claimooor = () => {
  const Me3ClaimWidget = createComponent({
    react: React,
    tagName: 'me3-claim-widget',
    elementClass: me3.ClaimWidget
  })

  const provider = new ethers.providers.Web3Provider(window.ethereum)

  return (
    <>
      <Me3ClaimWidget
        domain="me3.eth"
        provider={provider}
        alchemyapi={{ key: 'demo', env: 'mainnet' }}
        token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
        hide-token-selector="true"
        hide-description="true"
        hide-claim-btn="true"
        onSubdomainupdated{({ detail }) => subdomain = detail.value}
        />

      <button onClick={mint}>Mint</button>
    </>
  )
}
```
