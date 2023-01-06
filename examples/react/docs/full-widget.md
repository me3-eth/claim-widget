### Full widget

**Scenario:** Your hodlers have already minted their tokens, now we can tie a subdomain to any one of their tokens

```jsx
import WebComponent from '@clubajax/react-web-component'
import '@me3/claim-widget'

<WebComponent
  component="me3-claim-widget"
  domain="me3.eth"
  provider={window.ethereum}
  alchemyapi={{ key: 'demo', env: 'mainnet' }}
  token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
  />
```

