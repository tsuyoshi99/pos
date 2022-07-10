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

function createConfig(quantity, indicator, price) {
  return {
    quantity: quantity,
    indicator: indicator,
    price: price,
  };
}

function AddProduct(props) {
  const { toggleAddProductVisible } = props.productStore;

  const [productConfigCount, setProductConfigCount] = React.useState(1);
  const [configList, setConfigList] = React.useState([
    createConfig(null, "", ""),
  ]);
  const [name, setName] = React.useState("");

  function handleAddConfig() {
    setProductConfigCount(productConfigCount + 1);
    setConfigList([...configList, createConfig(null, "", "")]);
  }

  function handleRemoveConfig() {
    if (productConfigCount > 1) {
      setProductConfigCount(productConfigCount - 1);
      setConfigList([...configList.slice(0, -1)]);
    }
  }

  function handleConfigChange(index, prop) {
    return (event) => {
      const newConfigList = [...configList];
      newConfigList[index][prop] = event.target.value;
      setConfigList(newConfigList);
    };
  }

  function handleSubmit() {
    const obj = {
      name: name,
      forms: configList,
    };
    console.log(obj);
  }

  return (
    <Box sx={{ px: { sm: "5rem", md: "10rem", lg: "0" } }}>
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
                id={`quantity${index}`}
                label="Has:"
                type="number"
                value={configList[index].quantity}
                onChange={(text) => {
                  handleConfigChange(index, "quantity")(text);
                }}
                sx={{ width: "50%", pr: 1 }}
              />
              <TextField
                id={`indicator${index}`}
                label="Indicator:"
                value={configList[index].indicator}
                onChange={(text) => {
                  handleConfigChange(index, "indicator")(text);
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
                id={`price${index}`}
                label="Price for Each:"
                variant="outlined"
                value={configList[index].price}
                onChange={(text) => {
                  handleConfigChange(index, "price")(text);
                }}
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
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </Box>
    </Box>
  );
}

export default inject("productStore")(observer(AddProduct));
