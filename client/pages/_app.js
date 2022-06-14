import "antd/dist/antd.css";
import TopNav from "../components/TopNav";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/auth";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-center" />
        <TopNav />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
