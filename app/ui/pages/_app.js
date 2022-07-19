import "../styles/globals.css";

import { SnackbarProvider } from "notistack";
import { Provider } from "mobx-react";
import CartStore from "../stores/CartStore";
import ProductStore from "../stores/ProductStore";
import AuthStore from "../stores/AuthStore";
import ErrorMsgStore from "../stores/ErrorMsgStore";
import ActiveProduct from "../stores/ActiveProduct";

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack={4}>
      <Provider
        cartStore={CartStore}
        productStore={ProductStore}
        authStore={AuthStore}
        errorMsgStore={ErrorMsgStore}
        activeProduct={ActiveProduct}
      >
        <Component {...pageProps} />
      </Provider>
    </SnackbarProvider>
  );
}

export default MyApp;
