import { inject, observer } from "mobx-react";
import { useSnackbar } from "notistack";

function UpdateProduct(props) {
  const { updateProduct } = props.productStore;
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

  function handleUpdate(e) {
    e.preventDefault();

    // Create Obj for inventory
    let tempInventory = [];
    props.product.inventory.map((item) => {
      tempInventory.push({ quantity: item.quantity });
    });
    const obj = {
      name: props.product.name,
      inventory: tempInventory,
    };
    console.log(obj);

    // Update Product Request
    updateProduct(obj, props.product.id).then((res) => {
      console.log(res);
      queueSnackbar("Product Updated!", { variant: "success" });
      const checkbox = document.getElementById("update-product-modal");
      checkbox.checked = !checkbox.checked;
    });
  }

  return (
    <div className="modal">
      {props.product != null && (
        <div className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold mb-4 text-center">
            {props.product.name}
          </h3>

          <div>
            {props.product.inventory.map((form, index) => (
              <label className="grid grid-cols-3 my-3" key={index}>
                <input
                  type="number"
                  min="0"
                  onFocus={(e) => e.target.select()}
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
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <div className="modal-action mt-0">
              <label
                className="btn btn-outline mr-2"
                htmlFor="update-product-modal"
                // onClick={resetForm}
              >
                Cancel
              </label>
            </div>
            <input
              type="button"
              className="modal-action mt-0 btn"
              htmlFor="update-product-modal"
              value="Update"
              onClick={(e) => handleUpdate(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default inject("productStore")(observer(UpdateProduct));
