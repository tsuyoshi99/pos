import posStyles from "../styles/pos.module.sass";
import Grid from "@mui/material/Grid";

export default function OrderItem({ title, quantity, price }) {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={4}>
        <div>Product</div>
      </Grid>
      <Grid item xs={4}>
        <div>Quantity</div>
      </Grid>
      <Grid item xs={4}>
        <div>Price</div>
      </Grid>
    </Grid>
  );
}
