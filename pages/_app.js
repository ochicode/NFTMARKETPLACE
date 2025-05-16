import "../styles/globals.css";

// INTERNAL IMPORT
import { Footer, NavBar } from "../components/componentsindex";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}
