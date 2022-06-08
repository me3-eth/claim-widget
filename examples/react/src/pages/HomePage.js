import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { mock } from '@depay/web3-mock'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import readmePath from '../../README.md'

import WebComponent from '@clubajax/react-web-component'
import '@me3/claim-widget'

mock({
  blockchain: 'ethereum',
  accounts: {
    return: ['0xb25205ca60f964d45b30e969dc3f10a5de4ec3bc']
  }
})

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
        <div css={css`width: 500px`}>
          <WebComponent
            component="me3-claim-widget"
            domain="me3.eth"
            provider={window.ethereum}
            alchemyapi={{ key: 'demo', env: 'mainnet' }}
            token-address="0x9759226B2F8ddEFF81583e244Ef3bd13AAA7e4A1"
            />
        </div>
      </section>

      <section css={sectionStyle}>
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
      </section>
    </div>
  );
};

export default HomePage;
