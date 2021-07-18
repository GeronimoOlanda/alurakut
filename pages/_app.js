import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from'../src/lib/alurakutCommons';
const GlobalStyle = createGlobalStyle`

  /* Resetando CSS */
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
  }
  body {
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);


    font-family: sans-serif;
  }

  #_next{
    display: flex;
    min-height: 100vh;
    flex-direction:column;
  }

  img{
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles};
`;


const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
