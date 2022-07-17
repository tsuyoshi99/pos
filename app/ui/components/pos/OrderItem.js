import { inject, observer } from "mobx-react";

function OrderItem(props) {
  const { removeFromCart } = props.cartStore;

  return (
    <div className="grid grid-cols-3 items-center">
      <div>{props.product.name}</div>
      <div>
        x {props.product.quantity} {props.product.coefficient}
      </div>
      <div className="flex flex-row items-center justify-between">
        <div>$ {props.product.price}</div>
        <button
          className="btn btn-square btn-error my-1"
          onClick={() => removeFromCart(props.product)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f2f2f2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
    // <Grid container direction="row" spacing={2}>
    //   <Grid item xs={4}>
    //     <p>{props.product.name}</p>
    //   </Grid>
    //   <Grid item xs={4}>
    //     <p>
    //       x {props.product.quantity} {props.product.indicator}
    //     </p>
    //   </Grid>
    //   <Grid
    //     item
    //     xs={4}
    //     container
    //     justifyContent="space-between"
    //     direction="row"
    //   >
    //     <p>$ {props.product.price}</p>
    //     <IconButton
    //       aria-label="delete"
    //       color="error"
    //       onClick={() => {
    //         removeFromCart(props.product);
    //       }}
    //     >
    //       <DeleteIcon />
    //     </IconButton>
    //   </Grid>
    // </Grid>
  );
}

export default inject("cartStore")(observer(OrderItem));
