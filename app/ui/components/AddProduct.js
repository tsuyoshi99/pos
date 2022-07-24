import * as React from "react";
import { inject, observer } from "mobx-react";
import { useSnackbar } from "notistack";
import { validateNumber } from "core/validation";

function createConfig(coefficient, indicator, price) {
  return {
    coefficient: coefficient,
    name: indicator,
    price: price,
  };
}

function AddProduct(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { toggleAddProductVisible, addProduct, getAllProducts } =
    props.productStore;

  const [productConfigCount, setProductConfigCount] = React.useState(1);
  const [configList, setConfigList] = React.useState([
    createConfig("", "", ""),
  ]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

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

  function handleAddConfig(event) {
    event.preventDefault();
    setProductConfigCount(productConfigCount + 1);
    setConfigList([...configList, createConfig("", "", "")]);
  }

  function handleRemoveConfig(event) {
    event.preventDefault();
    if (productConfigCount > 1) {
      setConfigList([...configList.slice(0, -1)]);
      setProductConfigCount(productConfigCount - 1);
    }
  }

  function handleConfigChange(index, prop) {
    return (event) => {
      const newConfigList = [...configList];
      newConfigList[index][prop] = event.target.value;
      setConfigList(newConfigList);
    };
  }

  function selectOnFocus(event) {
    event.target.select();
  }

  function resetForm() {
    setName("");
    setDescription("");
    setProductConfigCount(1);
    setConfigList([createConfig("", "", "")]);
  }

  function validateForm(obj) {
    let flag = true;
    if (obj.name.length === 0) {
      queueSnackbar("Name is required", { variant: "error" });
      flag = false;
    }
    if (obj.description.length === 0) {
      queueSnackbar("Description is required", { variant: "error" });
      flag = false;
    }
    obj.forms.map((form, index) => {
      if (form.name.length === 0) {
        queueSnackbar(`Indicator at level ${index + 1} is required`, {
          variant: "error",
        });
        flag = false;
      }
      if (form.coefficient.length === 0) {
        queueSnackbar(`Coefficient at level ${index + 1} is required`, {
          variant: "error",
        });
        flag = false;
      }
      if (form.price.length === 0) {
        queueSnackbar(`Price at level ${index + 1} is required`, {
          variant: "error",
        });
        flag = false;
      }
      if (form.price === 0 || !validateNumber(form.price)) {
        queueSnackbar(`Price at level ${index + 1} must be a number`, {
          variant: "error",
        });
        flag = false;
      }
    });
    return flag;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // format configList
    let inventory = [];
    configList.forEach((element) => {
      element.coefficient = Number(element.coefficient);
      element.price = Number(element.price);
      inventory.push({ quantity: 0 });
    });

    const obj = {
      name: name,
      description: description,
      forms: configList,
      inventory: inventory,
    };
    if (!validateForm(obj)) return;
    console.log(obj);
    queueSnackbar("Creating New Product...", { variant: "info" });
    addProduct(obj)
      .then((res) => {
        getAllProducts();
        console.log(res);
        toggleAddProductVisible(false);
        queueSnackbar("Product Created", { variant: "success" });
        const checkbox = document.getElementById("add-product-modal");
        checkbox.checked = !checkbox.checked;
      })
      .catch((err) => {
        if (err.response.data) {
          console.log(err.response.data);
          queueSnackbar(err.response.data, { variant: "error" });
        } else queueSnackbar("err.message", { variant: "error" });
      });
  }

  return (
    <div className="modal">
      <div className="modal-box relative" htmlFor="">
        <h3 className="text-xl font-bold mb-4">Create New Product</h3>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Paracetamol"
            className="input input-bordered w-full"
            value={name}
            onChange={(text) => setName(text.target.value)}
          />
        </div>
        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text">Product Description</span>
          </label>
          <input
            id="description"
            type="text"
            placeholder="Description here..."
            className="input input-bordered w-full"
            value={description}
            onChange={(text) => setDescription(text.target.value)}
          />
        </div>
        {configList?.map((config, index) => {
          return (
            <div key={index}>
              <div className="flex mb-2">
                <div className="form-control w-1/2 mb-2 pr-2">
                  <label className="label">
                    <span className="label-text">Indicator:</span>
                  </label>
                  <input
                    id={`indicator${index}`}
                    type="text"
                    placeholder="Indicator..."
                    onFocus={selectOnFocus}
                    className="input input-bordered w-full"
                    value={config["name"]}
                    onChange={(text) => {
                      handleConfigChange(index, "name")(text);
                    }}
                  />
                </div>
                <div className="form-control w-1/2 mb-2 pr-2">
                  <label className="label">
                    <span className="label-text">Coefficient:</span>
                  </label>
                  <input
                    id={`coefficient${index}`}
                    type="number"
                    min="0"
                    placeholder="Coefficient..."
                    onFocus={selectOnFocus}
                    disabled={index == 0}
                    className="input input-bordered w-full"
                    value={index == 0 ? 1 : config["coefficient"]}
                    onChange={(text) => {
                      handleConfigChange(index, "coefficient")(text);
                    }}
                  />
                </div>
                <div className="flex shrink-0 items-end mb-2">
                  <button
                    aria-label="remove"
                    className="btn btn-circle"
                    onClick={(e) => handleRemoveConfig(e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f2f2f2"
                      strokeWidth="4"
                      strokeLinecap="butt"
                      strokeLinejoin="arcs"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="form-control w-full mb-2 pr-2">
                  <label className="label">
                    <span className="label-text">Price for Each:</span>
                  </label>
                  <input
                    id={`price${index}`}
                    type="number"
                    min="0"
                    placeholder="Price for Each..."
                    onFocus={selectOnFocus}
                    className="input input-bordered w-full"
                    value={config["price"]}
                    onChange={(text) => {
                      handleConfigChange(index, "price")(text);
                    }}
                  />
                </div>
                <div className="flex shrink-0 items-end mb-2">
                  <button
                    aria-label="add-new"
                    className="btn btn-circle"
                    onClick={(e) => handleAddConfig(e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f2f2f2"
                      strokeWidth="3"
                      strokeLinecap="butt"
                      strokeLinejoin="arcs"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-end">
          <div className="modal-action">
            <label
              className="btn btn-outline mr-2"
              htmlFor="add-product-modal"
              onClick={resetForm}
            >
              Cancel
            </label>
          </div>
          <input
            type="button"
            className="modal-action btn"
            htmlFor="add-product-modal"
            value="Create"
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default inject("productStore")(observer(AddProduct));
