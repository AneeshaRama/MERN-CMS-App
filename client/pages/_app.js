import "antd/dist/antd.css";
import TopNav from "../components/TopNav";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/auth";
import { PostProvider } from "../context/post";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>BLOGGER | Explore your favorite blog posts</title>
      </Head>
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
