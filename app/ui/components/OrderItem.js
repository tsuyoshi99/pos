import posStyles from "../styles/pos.module.sass";

import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OrderItem(props) {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <p>{props.product.title}</p>
      </Grid>
      <Grid item xs={4}>
        <p>x {props.product.quantity}</p>
      </Grid>
      <Grid
        item
        xs={4}
        container
        justifyContent="space-between"
        direction="row"
      >
        <p>$ {props.product.price}</p>
        <IconButton aria-label="delete" color="error">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
