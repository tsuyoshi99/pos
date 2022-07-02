import "../styles/globals.css";

import { Provider } from "mobx-react";
import CartStore from "../stores/CartStore";
import ProductStore from "../stores/ProductStore";

function MyApp({ Component, pageProps }) {
  return (
    <Provider cartStore={CartStore} productStore={ProductStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
