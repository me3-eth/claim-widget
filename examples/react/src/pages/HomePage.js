import React from 'react';
import { css } from '@emotion/react';
import '@me3/claim-widget'

const HomePageStyle = css`
  h1 {
    font-size: 5rem;
    font-weight: 600;
    text-align: center;
  }
`;

const HomePage = () => {
  return (
    <div css={[HomePageStyle]}>
      <h1 className="title">Hello React!</h1>
      <me3-claim-widget domain="me3.eth" />
    </div>
  );
};

export default HomePage;
