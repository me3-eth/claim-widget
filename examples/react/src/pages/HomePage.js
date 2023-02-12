import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { anything, mock } from '@depay/web3-mock'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { createComponent } from '@lit-labs/react'
import { ethers } from 'ethers'
import readmePath from '../../README.md'
import fullWidgetPath from '../../docs/full-widget.md'
import miniWidgetPath from '../../docs/mini-widget.md'
import registrarAbi from '../../../../tests/Registrar.json'
import Me3Logo from '../../public/logo.svg'

import { ClaimWidget } from '@me3/claim-widget'

function fakeMint () {
}

// Mock blockchain requests
mock({
  blockchain: 'ethereum',
  transaction: {
    to: '0x8E424e5B34C676E5BE793d82E3fAA75B26693264',
    api: registrarAbi.abi,
    method: 'register',
    params: ['0x868437061435f35898f8ed7fb95d62ca53b460f0bb9d1c6be3bfd796e38d8636', anything, '0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc', []]
  },
  call: {
    to: '0x8E424e5B34C676E5BE793d82E3fAA75B26693264',
    api: registrarAbi.abi,
    method: 'valid',
    params: ['0x868437061435f35898f8ed7fb95d62ca53b460f0bb9d1c6be3bfd796e38d8636', anything],
    return: true
  },
  accounts: { return: ['0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc'] }
})


const containerStyle = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  gap: 5%;
  padding: 5%;
  @media (min-width:801px) { /* tablet, landscape iPad, lo-res laptops ands desktops */
    padding: 1%;
  }
`

const sectionStyle = css`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
  @media (min-width:801px) { /* tablet, landscape iPad, lo-res laptops ands desktops */
    flex-direction: row;
  }
`

const demoColStyle = css`
  width: 100%;
  max-width: 430px;
`

const descColStyle = css`
  width: 100%;
  max-width: 700px;
`

const introStyle = css`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const logoStyle = css`
  display: block;
  margin: 0 auto;
`

const codeStyle = css``

const HomePage = () => {
  const [readmeSrc, setReadmeSrc] = useState('')
  const [fullWidgetSrc, setFullWidgetSrc] = useState('')
  const [miniWidgetSrc, setMiniWidgetSrc] = useState('')

  useEffect(() => {
    setReadmeSrc(readmePath)
    setFullWidgetSrc(fullWidgetPath)
    setMiniWidgetSrc(miniWidgetPath)
  }, [])

  const Me3ClaimWidget = createComponent({
    react: React,
    tagName: 'me3-claim-widget',
    elementClass: ClaimWidget
  })

  const provider = new ethers.providers.Web3Provider(window.ethereum)

  return (
    <div css={containerStyle}>
      <img css={logoStyle} src={Me3Logo} alt="Symbolic representation of a chain link, the logo for me3" />
      <section css={introStyle}>
        <div css={css`width: 100%; @media (min-width:801px) { width: 80%; }`}>
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

      <section css={sectionStyle}>
        <div css={demoColStyle}>
          <h1>Full widget</h1>
          <Me3ClaimWidget
            domain="me3.eth"
            provider={provider}
            alchemyapi={{ key: 'abc123', env: 'mainnet' }}
            token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
            />
        </div>
        <div css={descColStyle}>
          <ReactMarkdown
            children={fullWidgetSrc}
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

      <section css={sectionStyle}>
        <div css={demoColStyle}>
          <h1>Mini widget</h1>
          <Me3ClaimWidget
            domain="me3.eth"
            provider={window.ethereum}
            alchemyapi={{ key: 'abc123', env: 'mainnet' }}
            token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
            hide-token-selector="true"
            hide-description="true"
            hide-claim-btn="true"
            />
        </div>

        <div css={descColStyle}>
          <ReactMarkdown
            children={miniWidgetSrc}
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
