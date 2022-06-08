import React from 'react';
import { css, Global } from '@emotion/react';

import { useThemeContext } from '../contexts/ThemeContext';

const globalStyle = (colors) => css`
  body {
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-property: border, background, color;
  }

  main {
    flex: 1;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const AppLayout = ({ children }) => {
  const { colors } = useThemeContext();

  return (
    <>
      <Global styles={[globalStyle(colors)]} />
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
