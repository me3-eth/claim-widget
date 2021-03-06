# me3 Subdomain Claim Widget - React

An embedable, cross-framework widget for claiming subdomains on the **me3** subdomain registrar.

## Installation

Add to your project:

```sh
# with yarn
yarn add @me3/claim-widget

# with npm
npm i @me3/claim-widget
```

Optionally, install a webcomponent wrapper:

```sh
# with yarn
yarn add @clubajax/react-web-component

# with npm
npm i @clubajax/react-web-component
```

## Usage

The claim widget is flexible and can be used as part of an NFT mint or as a value add post-mint.

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

### Mini widget

**Scenario:** You want to allow for subdomains to be minted at the same time that your NFT is minting

```jsx
import WebComponent from '@clubajax/react-web-component'
import * as cw from '@me3/claim-widget'

let subdomain = ''

function mint () {
  const tokenId = /* your token minting function */ 7;

  cw.claim('me3.eth', subdomain, { authData: [tokenId] })
    .then(tx => tx.wait())
    .then(result => console.log({ result })
    .catch(claimErr => console.log({ claimErr })
}

<WebComponent
  component="me3-claim-widget"
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
