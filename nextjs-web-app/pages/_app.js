import Header from "../components/Header";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <Header moralisAuth={false}/>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
