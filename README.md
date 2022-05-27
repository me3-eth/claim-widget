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
  --me3-container-padding: 30px 20px;
  --me3-container-background: #ffffff;
  --me3-container-box-shadow: 0px 6px 30px rgba(108, 108, 128, 0.06);
}
```
