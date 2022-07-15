import styles from "../styles/index.module.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import Button from "@mui/material/Button";
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
        <Button
          key={key}
          style={{ color: "white" }}
          size="small"
          onClick={() => closeSnackbar(key)}
        >
          CLOSE
        </Button>
      ),
    });
  }

  function handleAddConfig() {
    setProductConfigCount(productConfigCount + 1);
    setConfigList([...configList, createConfig("", "", "")]);
  }

  function handleRemoveConfig() {
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

  function handleSubmit(event) {
    event.preventDefault();
    // format configList
    configList.forEach((element) => {
      element.coefficient = Number(element.coefficient);
      element.price = Number(element.price);
    });

    // validate configList
    // ToDo: validate configList

    const obj = {
      name: name,
      description: description,
      forms: configList,
      inventory: {
        quantity: 0,
      },
    };
    console.log(obj);
    queueSnackbar("Creating New Product...", { variant: "info" });
    addProduct(obj)
      .then((res) => {
        getAllProducts();
        console.log(res);
        toggleAddProductVisible(false);
        queueSnackbar("Product Created", { variant: "success" });
      })
      .catch((err) => {
        console.log(err.response.data);
        queueSnackbar(err.response.data, { variant: "error" });
      });
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ px: { sm: "5rem", md: "10rem", lg: "0" } }}
    >
      <Box sx={{ mb: 2 }}>
        <TextField
          required
          fullWidth
          id="name"
          label="Product Name"
          variant="outlined"
          value={name}
          onChange={(text) => setName(text.target.value)}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          multiline
          id="description"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(text) => setDescription(text.target.value)}
        />
      </Box>
      {configList.map((config, index) => {
        return (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                mb: 2,
              }}
            >
              <TextField
                id={`indicator${index}`}
                label="Indicator:"
                value={configList[index].setName}
                onChange={(text) => {
                  handleConfigChange(index, "name")(text);
                }}
                onFocus={selectOnFocus}
                sx={{ width: "50%", pr: 1 }}
              />
              <TextField
                id={`coefficient${index}`}
                label="Coefficient:"
                type="number"
                onFocus={selectOnFocus}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 12);
                }}
                inputProps={{ readOnly: index == 0 ? true : false }}
                value={index == 0 ? 1 : configList[index].coefficient}
                onChange={(text) => {
                  handleConfigChange(index, "coefficient")(text);
                }}
                sx={{ width: "50%" }}
              />
              <Box
                sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}
              >
                <IconButton aria-label="remove" onClick={handleRemoveConfig}>
                  <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ display: "flex", mb: 2 }}>
              <TextField
                fullWidth
                onFocus={selectOnFocus}
                id={`price${index}`}
                label="Price for Each:"
                variant="outlined"
                value={configList[index].price}
                onChange={(text) => {
                  handleConfigChange(index, "price")(text);
                }}
                type="number"
              />
              <Box
                sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}
              >
                <IconButton aria-label="add-new" onClick={handleAddConfig}>
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          sx={{ mr: 2 }}
          onClick={() => toggleAddProductVisible(false)}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Box>
    </Box>
  );
}

export default inject("productStore")(observer(AddProduct));
