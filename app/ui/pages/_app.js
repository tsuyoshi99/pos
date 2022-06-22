import "../styles/globals.css";

import { Provider } from "mobx-react";
import CartStore from "../stores/CartStore";

function MyApp({ Component, pageProps }) {
  return (
    <Provider cartStore={CartStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
