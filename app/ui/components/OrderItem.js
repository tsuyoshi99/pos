import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { inject, observer } from "mobx-react";

function OrderItem(props) {
  const { removeFromCart } = props.cartStore;

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
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => {
            removeFromCart(props.product);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default inject("cartStore")(observer(OrderItem));
