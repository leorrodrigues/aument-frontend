import { createGlobalStyle } from 'styled-components';
import theme from 'styles/theme';

require('antd/dist/antd.less');

const globalStyles = createGlobalStyle`

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

  html {
    font-size: 62.5%;
  }

  html, body, #__next {
    height: 100%;
  }

  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  // CSS for tooltip when menu is collapsed
  .ant-menu-inline-collapsed-tooltip {
    span {color: ${theme.colors.white}}
  }
`;

export default globalStyles;
