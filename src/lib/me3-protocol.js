import ethers from 'ethers'
import ky from 'ky'

const PROTOCOL_ADDRESS = ''

export async function claim (domain, label, opts = {}) {
  if (!opts.provider) {
    throw new Error('Must provide an EIP-1193, EIP-1102, EIP-3085 and EIP-3326 compliant provider')
  }
  const p = new ethers.Web3Provider(opts.provider)
  const signer = p.getSigner()

  // check if label is properly formatted
  // check if domain is properly formatted

  const additionalData = opts.authData || []
  const node = ethers.utils.namehash(domain)
  const mintTo = opts.ownerAddress || await signer.getAddress()

  // create contract
  const abi = [
    'function register(bytes32,string,address,bytes[]) public'
  ]
  const protocol = new ethers.Contract(PROTOCOL_ADDRESS, abi, signer)

  const tx = await protocol.register(node, label, mintTo, additionalData)
  const result = await tx.wait()
  console.log({ result })
}

export async function nftApi (tokenAddress, walletAddress, opts = {}) {
  if (!opts.alchemyApi || !opts.alchemyApi.key) {
    throw new Error('Missing Alchemy API key')
  }
  const apiKey = opts.alchemyApi.key
  const apiEnv = opts.alchemyApi.env || 'mainnet'

  const options = { mode: 'cors', redirect: 'follow' }

  let owned = []
  try {
    const searchParams = new URLSearchParams({
      owner: walletAddress
    })
    const data = await ky.get(`https://eth-${apiEnv}.alchemyapi.io/v2/${apiKey}/getNFTs`, { ...options, searchParams }).json()

    owned = data.ownedNfts
      .filter(nft => nft.contract.address.toLowerCase() === tokenAddress.toLowerCase())
      .map(nft => nft.id.tokenId)

  } catch (err) {
    throw new Error('Unable to load NFTs')
  }

  return Promise.all(
    owned.map(tokenId => {
      const searchParams = new URLSearchParams({
        contractAddress: tokenAddress,
        tokenId 
      })
      return ky.get(`https://eth-${apiEnv}.alchemyapi.io/v2/${apiKey}/getNFTMetadata`, { ...options, searchParams })
        .json()
    })
  )
}
