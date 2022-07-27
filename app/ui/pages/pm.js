import * as React from "react";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { inject, observer } from "mobx-react";
import NavBar from "../components/NavBar";
import AddProduct from "../components/pm/AddProduct";
import UpdateProduct from "../components/pm/UpdateProduct";
import ConfirmDialog from "../components/ConfirmDialog";

function ProductManagement(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { products, getAllProducts, deleteProduct } = props.productStore;
  const [currentId, setCurrentId] = React.useState(null);

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

  function handleDeleteProduct(id) {
    deleteProduct(id).then((res) => {
      queueSnackbar("Product Deleted!", { variant: "success" });
      getAllProducts();
      const checkbox = document.getElementById("confirm-dialog");
      checkbox.checked = !checkbox.checked;
    });
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <div className="contain">
        <Head>
          <title>Product Management</title>
          <meta
            name="description"
            content="Point of Sale dedicated for Pharmacy."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="main">
          {/* Create New Product Button */}
          <div className="mb-4 w-full">
            <label
              className="btn gap-2 modal-button"
              htmlFor="add-product-modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f2f2f2"
                strokeWidth="2"
                strokeLinecap="butt"
                strokeLinejoin="arcs"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Add New Product
            </label>
          </div>

          <input
            type="checkbox"
            id="add-product-modal"
            className="modal-toggle"
          />
          <AddProduct htmlFor="add-product-modal" />

          {/* Product Table */}
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th className="text-center">ID</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Indicator</th>
                  <th>Price for Each</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{product.id}</td>
                      <td>{capitalize(product.name)}</td>
                      <td>
                        {product.inventory.map((form, index) => {
                          return (
                            <div key={index} className="indicator">
                              {form.quantity}
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        {product.inventory.map((form, index) => {
                          return (
                            <div key={index} className="indicator">
                              {capitalize(form.name)}
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        {product.inventory.map((form, index) => {
                          return (
                            <div key={index} className="indicator">
                              {form.price}
                            </div>
                          );
                        })}
                      </td>
                      <td className="text-center">
                        {/* Update Button */}
                        <>
                          <label
                            className="btn btn-square modal-button mr-4"
                            htmlFor="update-product-modal"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#f2f2f2"
                              strokeWidth="2"
                              strokeLinecap="butt"
                              strokeLinejoin="arcs"
                            >
                              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                            </svg>
                          </label>
                          <input
                            type="checkbox"
                            id="update-product-modal"
                            className="modal-toggle"
                          />
                          <UpdateProduct htmlFor="update-product-modal" />
                        </>

                        {/* Delete Button */}
                        <>
                          <label
                            className="btn btn-square modal-button"
                            htmlFor="confirm-dialog"
                            onClick={() => setCurrentId(product.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#f2f2f2"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </label>
                          <input
                            type="checkbox"
                            id="confirm-dialog"
                            className="modal-toggle"
                          />
                          <ConfirmDialog
                            htmlFor="confirm-dialog"
                            title="Are you sure?"
                            message="This action cannot be undone."
                            cancelText="Cancel"
                            confirmText="Delete"
                            onConfirm={() => {
                              handleDeleteProduct(currentId);
                            }}
                          />
                        </>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

export default inject("productStore")(observer(ProductManagement));
