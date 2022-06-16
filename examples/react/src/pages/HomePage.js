import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { anything, mock } from '@depay/web3-mock'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import readmePath from '../../README.md'
import registrarAbi from '../../../../tests/Registrar.json'
import faker from 'storybook-addon-mock/dist/utils/faker.js'

import WebComponent from '@clubajax/react-web-component'
import '@me3/claim-widget'

mock({
  blockchain: 'ethereum',
  transaction: {
    to: '0x9f2daf90c4323b529c31a40520a5fa63eb601b84',
    api: registrarAbi.abi,
    method: 'register',
    params: ['0x868437061435f35898f8ed7fb95d62ca53b460f0bb9d1c6be3bfd796e38d8636', anything, '0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc', []]
  },
  call: {
    to: '0x9f2daf90c4323b529c31a40520a5fa63eb601b84',
    api: registrarAbi.abi,
    method: 'valid',
    params: ['0x868437061435f35898f8ed7fb95d62ca53b460f0bb9d1c6be3bfd796e38d8636', anything],
    return: true
  },
  accounts: { return: ['0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc'] }
})

const metadataMock = {
  url: 'https://eth-mainnet.alchemyapi.io/v2/abc123/getNFTMetadata?contractAddress=0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1&tokenId=',
  method: 'GET',
  status: 200,
  response: req => {
    const { searchParams } = req
    const tokenNum = parseInt(searchParams.tokenId)

    return {
      title: `Logo #${tokenNum}`,
      id: { tokenId: searchParams.tokenId },
      media: [{ gateway: `https://storageapi.fleek.co/19601a7e-4370-48a9-9b52-d66cb11fb2e5-bucket/fakeme3nft/${tokenNum}.jpg` }]
    }
  }
}

const defaultMockNfts = [
  {
    url: 'https://eth-mainnet.alchemyapi.io/v2/abc123/getNFTs?owner=0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc',
    method: 'GET',
    status: 200,
    response: {
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
    }
  },
  metadataMock
]

faker.makeInitialRequestMap(defaultMockNfts)

const containerStyle = css`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: start;
  gap: 5%;
  padding: 5%;
`

const sectionStyle = css`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const codeStyle = css``

const HomePage = () => {
  const [readmeSrc, setReadmeSrc] = useState('')

  useEffect(() => {
    setReadmeSrc(readmePath)
  }, [])

  console.log({ supported: SyntaxHighlighter.supportedLanguages })

  return (
    <div css={containerStyle}>
      <section css={sectionStyle}>
        <div css={css`width: 430px`}>
          <h1>Full widget</h1>
          <WebComponent
            component="me3-claim-widget"
            domain="me3.eth"
            provider={window.ethereum}
            alchemyapi={{ key: 'abc123', env: 'mainnet' }}
            token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
            />
        </div>

        <div css={css`width: 430px`}>
          <h1>Mini widget</h1>
          <WebComponent
            component="me3-claim-widget"
            domain="me3.eth"
            provider={window.ethereum}
            alchemyapi={{ key: 'abc123', env: 'mainnet' }}
            token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
            hide-token-selector="true"
            hide-description="true"
            hide-claim-btn="true"
            />
        </div>
      </section>

      <section css={sectionStyle}>
        <div>
          <ReactMarkdown
            children={readmeSrc}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match =  /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
