import posStyles from "../styles/pos.module.sass";

import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OrderItem({ title, quantity, price }) {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs>
        <p>Product</p>
      </Grid>
      <Grid item xs>
        <p>Quantity</p>
      </Grid>
      <Grid item xs>
        <p>Price</p>
      </Grid>
      <Grid item xs="auto" alignItems="center">
        <IconButton aria-label="delete" color="error">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
