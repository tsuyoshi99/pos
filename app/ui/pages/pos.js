import * as React from "react";
import Head from "next/head";
import styles from "../styles/index.module.scss";

import NavBar from "../components/NavBar";
import ProductCard from "../components/pos/ProductCard";
import OrderItem from "../components/pos/OrderItem";

import { inject, observer } from "mobx-react";

function PointOfSale(props) {
  const { cart, addToCart, cartTotal, activeModal, setActiveModal } =
    props.cartStore;
  const { products, setProducts, getAllProducts } = props.productStore;

  function handleAddToCart() {
    addToCart(activeModal);
    // setActiveModal(null);
  }

  React.useEffect(() => {
    getAllProducts();
  }, [getAllProducts, setProducts]);

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

          {/* Product List */}
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Order List */}
            {cart.length !== 0 && (
              <div className="col-span-2 md:ml-8 md:order-last">
                <div className="grid grid-cols-3">
                  <div className="text-xl font-semibold">Product</div>
                  <div className="text-xl font-semibold">Quantity</div>
                  <div className="text-xl font-semibold">Price</div>
                </div>

                {cart.map((product, index) => (
                  <OrderItem product={product} key={index} />
                ))}
                <div className="divider my-0"></div>
                <div className="grid grid-cols-3">
                  <div></div>
                  <div className="text-lg font-semibold">Total</div>
                  <div className="text-lg font-semibold">$ {cartTotal}</div>
                </div>
                <button className="btn btn-primary w-full my-4">
                  Check Out
                </button>
              </div>
            )}

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
                  <h3 className="text-lg font-bold">
                    Select a coefficient for this product
                  </h3>
                  {activeModal.forms.map((form, index) => {
                    return (
                      <div key={index}>
                        <label className="block my-2">
                          <input
                            type="number"
                            min="0"
                            className="input input-bordered w-fit"
                            value={activeModal.forms[index].quantity}
                            onChange={(e) => {
                              setActiveModal({
                                ...activeModal,
                                forms: [
                                  ...activeModal.forms.slice(0, index),
                                  {
                                    ...activeModal.forms[index],
                                    quantity: e.target.value,
                                  },
                                  ...activeModal.forms.slice(index + 1),
                                ],
                              });
                            }}
                          />
                          <span className="ml-4 text-lg font-semibold">
                            {form.name}
                          </span>
                        </label>
                      </div>
                    );
                  })}
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

export default inject("cartStore", "productStore")(observer(PointOfSale));
