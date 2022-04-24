import type { AppProps } from "next/app";
import Layout from "./components/Layout";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout image="/preview.png">
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
