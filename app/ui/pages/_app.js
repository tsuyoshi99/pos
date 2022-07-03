import "../styles/globals.css";

import { Provider } from "mobx-react";
import NavBar from "../components/NavBar";
import CartStore from "../stores/CartStore";
import ProductStore from "../stores/ProductStore";

function MyApp({ Component, pageProps }) {
  return (
    <Provider cartStore={CartStore} productStore={ProductStore}>
      <NavBar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
