### Full widget

**Scenario:** Your hodlers have already minted their tokens, now we can tie a subdomain to any one of their tokens

```jsx
import { ethers } from 'ethers'
import { createComponent } from '@lit-labs/react'
import { ClaimWidget } from '@me3/claim-widget'

const Claimooor = () => {
  const Me3ClaimWidget = createComponent({
    react: React,
    tagName: 'me3-claim-widget',
    elementClass: me3.ClaimWidget
  })

  const provider = new ethers.providers.Web3Provider(window.ethereum)

  return (
    <Me3ClaimWidget
      domain="me3.eth"
      provider={provider}
      alchemyapi={{ key: 'demo', env: 'mainnet' }}
      token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
      />
  )
}
```

