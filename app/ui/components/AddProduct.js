import styles from "../styles/index.module.scss";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Button from "@mui/material/Button";

function ProductConfig() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          // gridTemplateColumns: "repeat(3, 1fr)",
          // gap: 1,
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
          type="number"
          sx={{ width: "50%" }}
        />
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <IconButton aria-label="add-new">
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Price for Each:"
          variant="outlined"
        />
      </Box>
    </Box>
  );
}

function AddProduct() {
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
      <ProductConfig />
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
