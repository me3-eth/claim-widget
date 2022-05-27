import { ethers } from 'ethers'

const PROTOCOL_ADDRESS = ''

export function claim (domain, label, opts = {}) {
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
