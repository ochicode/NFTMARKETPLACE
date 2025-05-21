import "../styles/globals.css";

// INTERNAL IMPORT
import { Footer, NavBar } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "@/Context/NFTMarketplaceContext";

export default function App({ Component, pageProps }) {
  return (
    <NFTMarketplaceProvider>
      <div>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </NFTMarketplaceProvider>
  );
}
