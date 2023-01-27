### Full widget

**Scenario:** Your hodlers have already minted their tokens, now we can tie a subdomain to any one of their tokens

```jsx
import { createComponent } from '@lit-labs/react'
import { ClaimWidget } from '@me3/claim-widget'

const Me3ClaimWidget = createComponent({
  react: React,
  tagName: 'me3-claim-widget',
  elementClass: ClaimWidget
})

<Me3ClaimWidget
  domain="me3.eth"
  provider={window.ethereum}
  alchemyapi={{ key: 'demo', env: 'mainnet' }}
  token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
  />
```

