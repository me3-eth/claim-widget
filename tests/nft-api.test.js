import test from 'ava'
import nock from 'nock'
import { nftApi } from '../src/lib/me3-protocol.js'

test('should throw an error if no credentials passed in', async (t) => {
  return t.throwsAsync(nftApi('0x0', '0x0'))
})

test('should support multiple environments', async (t) => {
  const mainnet = nock('https://eth-mainnet.alchemyapi.io')
    .get('/v2/abc123/getNFTs')
    .query(true)
    .reply(200, {
      ownedNfts: [
        {
          contract: { address: '0x0' },
          id: { tokenId: '0x0' }
        }
      ]
    })
    .get('/v2/abc123/getNFTMetadata')
    .query(true)
    .reply(200, [])

  const rinkeby = nock('https://eth-rinkeby.alchemyapi.io')
    .get('/v2/abc123/getNFTs')
    .query(true)
    .reply(200, {
      ownedNfts: [
        {
          contract: { address: '0x0' },
          id: { tokenId: '0x0' }
        }
      ]
    })
    .get('/v2/abc123/getNFTMetadata')
    .query(true)
    .reply(200, [])

  // default env is mainnet
  await nftApi('0x0', '0x0', { alchemyApi: { key: 'abc123' } })
    .then((response) => {
      t.true(mainnet.isDone())
      t.false(rinkeby.isDone())
    })

  await nftApi('0x0', '0x0', { alchemyApi: { key: 'abc123', env: 'rinkeby' } })
    .then(() => {
      t.true(rinkeby.isDone())
    })
})

test('user has no tokens on contract', async (t) => {
  const scope = nock('https://eth-mainnet.alchemyapi.io')
    .get('/v2/abc123/getNFTs')
    .query(true)
    .reply(200, {
      ownedNfts: [
        {
          contract: { address: '0x1337' },
          id: { tokenId: '0x0' }
        }
      ]
    })
  // only one network call should be made

  return nftApi('0x8008', '0x0', { alchemyApi: { key: 'abc123' } })
    .then((nfts) => {
      t.true(nfts.length === 0)
      t.true(scope.isDone())
    })
})
