import { rest } from 'msw'

export const handlers = [
  rest.get('https://eth-mainnet.alchemyapi.io/v2/abc123/getNFTs', (req, res, ctx) => {
    return res(
      ctx.json({
        ownedNfts: [
          {
            contract: { address: '0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1' },
            id: { tokenId: '0x1337' }
          },
          {
            contract: { address: '0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1' },
            id: { tokenId: '0x1338' }
          },
          {
            contract: { address: '0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1' },
            id: { tokenId: '0x1339' }
          },
        ]
      })
    )
  }),

  rest.get('https://eth-mainnet.alchemyapi.io/v2/abc123/getNFTMetadata', (req, res, ctx) => {
    const tokenId = req.url.searchParams.get('tokenId')
    const tokenNum = parseInt(tokenId)

    return res(
      ctx.json({
        title: `Logo #${tokenNum}`,
        id: { tokenId },
        media: [{ gateway: `https://storageapi.fleek.co/19601a7e-4370-48a9-9b52-d66cb11fb2e5-bucket/fakeme3nft/${tokenNum}.jpg` }]
      })
    )
  })
]
