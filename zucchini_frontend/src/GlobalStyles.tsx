import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};

  a {
    text-decoration: none;
    color: black;
    outline: none;
  }

  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=swap');

  @font-face{
    font-family: 'IBM Plex Sans KR', sans-serif;
    src: url("./assets/fonts/IBMPlexSansKR-Regular.ttf") format('ttf');
  }

  * {
    font-family: 'IBM Plex Sans KR', sans-serif;
  }

`;

export default GlobalStyles;
