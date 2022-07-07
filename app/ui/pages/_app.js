import "../styles/globals.css";

import { Provider } from "mobx-react";
import CartStore from "../stores/CartStore";
import ProductStore from "../stores/ProductStore";
import AuthStore from "../stores/AuthStore";

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      cartStore={CartStore}
      productStore={ProductStore}
      authStore={AuthStore}
    >
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
