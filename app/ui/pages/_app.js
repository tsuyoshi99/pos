import "../styles/globals.scss";

import { SnackbarProvider } from "notistack";
import { Provider } from "mobx-react";
import { appWithTranslation } from "next-i18next";
import CartStore from "../stores/CartStore";
import ProductStore from "../stores/ProductStore";
import AuthStore from "../stores/AuthStore";
import ErrorMsgStore from "../stores/ErrorMsgStore";
import ActiveProduct from "../stores/ActiveProduct";
import SalesStore from "../stores/SalesStore";

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack={4}>
      <Provider
        cartStore={CartStore}
        productStore={ProductStore}
        authStore={AuthStore}
        errorMsgStore={ErrorMsgStore}
        activeProduct={ActiveProduct}
        salesStore={SalesStore}
      >
        <Component {...pageProps} />
      </Provider>
    </SnackbarProvider>
  );
}

export default appWithTranslation(MyApp);
