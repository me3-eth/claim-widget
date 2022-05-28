# Claim Widget

Very, very early. Just a demo thing

## Usage

### In Svelte

_Writing documentation before code is actually available. Check demo code to see current state._

```svelte
<script>
  import ClaimWidget from '@me3/claim-widget'

  const ALCHEMY_API_KEY = ''
  const NFT_CONTRACT_ADDR = ''

  // EIP-1193, EIP-1102, EIP-3085 and EIP-3326 compliant
  // we suggest Blocknative's web3-onboard
  const provider = {}
</script>

<ClaimWidget
  title="Claim subdomain"
  nameLabel="Name"
  namePlaceholder="Enter subdomain name..."
  tokenLabel="NFT"
  claimButtonText="Claim"
  alchemyApiKey={ALCHEMY_API_KEY}
  contractAddress={NFT_CONTRACT_ADDR}
  {provider}
  />
```

### Styles

```css
:root {
  --me3-text-color: #1C1C33;

  --me3-container-border-radius: 40px;
  --me3-container-padding: 40px 30px;
  --me3-container-background: linear-gradient(257.35deg, #FFFFFF 0%, rgba(255, 255, 255, 0.25) 100%);
  --me3-container-box-shadow: 0px 6px 30px rgba(108, 108, 128, 0.06);
  --me3-container-item-gap: 32px;

  --me3-claimbtn-height: 64px;
  --me3-claimbtn-width: 196px;
  --me3-claimbtn-background: linear-gradient(256.24deg, #3D73FF -30.68%, rgba(121, 174, 255, 0.8) 23.64%, rgba(145, 142, 255, 0.75) 63.28%, rgba(87, 122, 255, 0.35) 97.37%);
  --me3-claimbtn-box-shadow: 0px 6px 60px rgba(134, 158, 255, 0.5);
  --me3-claimbtn-text-color: #ffffff;
  --me3-claimbtn-border-radius: 24px;
  --me3-claimbtn-border: none;

  --me3-input-border-radius: 16px;
  --me3-input-border: 1px solid #dedede;
  --me3-input-padding: 16px;
  --me3-input-margin: 0px;
  --me3-input-background: #ffffff;
  
  --me3-label-margin: 0 0 8px 0;
  --me3-label-font-size: 14px;
  --me3-label-line-height: 24px;
  --me3-label-font-weight: 500;
  --me3-label-display: block;
}
```
