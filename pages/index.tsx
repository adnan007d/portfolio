import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Body from "./components/Body";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Adnan</title>
        <meta
          name="description"
          content="Hello, I am Adnan Mansuri I Like Making Stuff"
        />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="article" />

        <meta property="og:title" content="Adnan" />

        <meta
          property="og:description"
          content="Hello, I am Adnan Mansuri I Like Making Stuff"
        />

        <meta property="og:image" content="/preview.png" />

        <meta property="og:site_name" content="Adnan Portfolio" />

        <meta name="twitter:title" content="Adnan" />

        <meta
          name="twitter:description"
          content="Hello, I am Adnan Mansuri I Like Making Stuff"
        />

        <meta name="twitter:image" content="/preview.png" />

        <meta name="twitter:site" content="@adnan007d" />

        <meta name="twitter:creator" content="@adnan007d" />
      </Head>

      <main className="flex flex-col min-h-screen">
        <NavBar />
        <Body className="flex-1" />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
