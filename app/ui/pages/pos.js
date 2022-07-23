import * as React from "react";
import Head from "next/head";
import styles from "../styles/index.module.scss";

import NavBar from "../components/NavBar";
import ProductCard from "../components/pos/ProductCard";
import OrderItem from "../components/pos/OrderItem";

import { inject, observer } from "mobx-react";
import { useSnackbar } from "notistack";

function PointOfSale(props) {
  const { products, setProducts, getAllProducts } = props.productStore;
  const { activeProduct, setActiveProduct } = props.activeProduct;
  const {
    cart,
    cartUI,
    productExist,
    addActiveProductToCart,
    submitCarttoSale,
    clearCart,
    cartTotal,
  } = props.cartStore;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function queueSnackbar(message, options) {
    enqueueSnackbar(message, {
      ...options,
      action: (key) => (
        <button
          key={key}
          className="white-text mr-2"
          onClick={() => closeSnackbar(key)}
        >
          CLOSE
        </button>
      ),
    });
  }

  function selectOnFocus(e) {
    e.target.select();
  }

  function handleAddToCart() {
    // setActiveModal(null);
    addActiveProductToCart(activeProduct);
  }

  function handleCheckOut() {
    queueSnackbar("Checking out...", { variant: "info" });
    submitCarttoSale()
      .then((res) => {
        console.log(res);
        queueSnackbar("Checkout successful!", { variant: "success" });
        clearCart();
      })
      .catch((err) => {
        if (err.response.data.error) {
          console.log(err.response.data.error);
          queueSnackbar(err.response.data.error.message, { variant: "error" });
        } else queueSnackbar(err.message, { variant: "error" });
      });
  }

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <div className={styles.container}>
        <Head>
          <title>Point of Sale</title>
          <meta
            name="description"
            content="Point of Sale dedicated for Pharmacy."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {/* Search Bar */}
          <div className="form-control mb-2 w-full">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered w-full md:w-auto"
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 w-full">
            {/* Order List */}

            <div className="col-span-2 md:ml-8 md:order-last mt-4">
              <div className="grid grid-cols-3">
                <div className="text-xl font-semibold">Product</div>
                <div className="text-xl font-semibold">Quantity</div>
                <div className="text-xl font-semibold">Price</div>
              </div>

              {cartUI.items.length > 0 ? (
                cartUI.items.map((product, index) => (
                  <React.Fragment key={index}>
                    <OrderItem product={product} />
                  </React.Fragment>
                ))
              ) : (
                <div className="flex justify-center border-2 rounded-md p-2 mb-3 mt-5 bg-slate-50 ease-in-out duration-300 hover:drop-shadow-md">
                  No item in cart
                </div>
              )}
              <div className="divider my-0"></div>
              <div className="grid grid-cols-3">
                <div></div>
                <div className="text-lg font-semibold">Total</div>
                <div className="text-lg font-semibold">$ {cartTotal}</div>
              </div>
              <button
                className="btn btn-primary w-full my-4"
                onClick={handleCheckOut}
              >
                Check Out
              </button>
            </div>

            {/* Product Card List */}
            <div className="col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {products.map((product, index) => (
                <div className="cursor-pointer" key={index}>
                  <ProductCard product={product} id={product.id} />
                </div>
              ))}
              {/* Modal */}
              <input type="checkbox" id="my-modal" className="modal-toggle" />
              <label
                htmlFor="my-modal"
                className="modal modal-bottom sm:modal-middle cursor-pointer"
              >
                <label className="modal-box relative" htmlFor="">
                  <h3 className="text-lg font-bold mb-2">
                    Select Quantity of {activeProduct.name}
                  </h3>
                  <div>
                    {activeProduct !== {} &&
                      activeProduct.inventory.map((form, index) => {
                        return (
                          <label className="grid grid-cols-3 my-3" key={index}>
                            <input
                              type="number"
                              min="0"
                              onFocus={selectOnFocus}
                              className="input input-bordered col-span-2"
                              value={form.quantity} // form.quantity
                              onChange={(e) => {
                                form.quantity = Number(e.target.value);
                              }}
                            />
                            <span className="ml-4 text-lg font-semibold capitalize">
                              {form.name}
                            </span>
                          </label>
                        );
                      })}
                  </div>
                  <div className="modal-action">
                    <label
                      htmlFor="my-modal"
                      className="btn btn-outline btn-primary"
                    >
                      Cancel
                    </label>
                    <label
                      htmlFor="my-modal"
                      className="btn btn-primary"
                      onClick={handleAddToCart}
                    >
                      Confirm
                    </label>
                  </div>
                </label>
              </label>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

export default inject(
  "productStore",
  "activeProduct",
  "cartStore"
)(observer(PointOfSale));
