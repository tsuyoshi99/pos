import styles from "../styles/index.module.scss";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import Button from "@mui/material/Button";

function createConfig(quantity, indicator, price) {
  return {
    quantity,
    indicator,
    price,
  };
}

function AddProduct() {
  const [productConfigCount, setProductConfigCount] = useState(1);
  const [configList, setConfigList] = useState([createConfig(1, "", "")]);

  function handleAddConfig() {
    setProductConfigCount(productConfigCount + 1);
    setConfigList([...configList, createConfig(1, "", "")]);
  }

  function handleRemoveConfig() {
    if (productConfigCount > 1) {
      setProductConfigCount(productConfigCount - 1);
      setConfigList([...configList.slice(0, -1)]);
    }
  }

  const ProductConfig = () => {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            mb: 2,
          }}
        >
          <TextField
            id="outlined-number"
            label="Has:"
            type="number"
            sx={{ width: "50%", pr: 1 }}
          />
          <TextField
            id="outlined-number"
            label="Indicator:"
            sx={{ width: "50%" }}
          />
          <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
            <IconButton aria-label="remove" onClick={handleRemoveConfig}>
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Price for Each:"
            variant="outlined"
          />
          <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
            <IconButton aria-label="add-new" onClick={handleAddConfig}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ px: { sm: "5rem", md: "10rem", lg: "0" } }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          required
          fullWidth
          id="outlined-required"
          label="Product Name"
          variant="outlined"
        />
      </Box>
      {configList.map((config, index) => {
        return <ProductConfig key={index} />;
      })}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained">Create</Button>
      </Box>
    </Box>
  );
}

export default AddProduct;
