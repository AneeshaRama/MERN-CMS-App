import "antd/dist/antd.css";
import TopNav from "../components/TopNav";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/auth";
import { PostProvider } from "../context/post";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <PostProvider>
          <Toaster position="top-center" />
          <TopNav />
          <Component {...pageProps} />
        </PostProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
