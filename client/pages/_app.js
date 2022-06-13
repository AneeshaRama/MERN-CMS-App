import "antd/dist/antd.css";
import TopNav from "../components/TopNav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <TopNav />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
