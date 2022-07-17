import * as React from "react";
import { inject, observer } from "mobx-react";

function ProductCard(props) {
  const { addToCart, setActiveModal } = props.cartStore;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{props.product.name} &rarr;</h2>
        <p>{props.product.description}</p>
        <div className="card-actions justify-end">
          <label
            htmlFor="my-modal"
            className="btn btn-outline btn-primary"
            onClick={() => {
              setActiveModal(props.product);
              console.log(props.product);
            }}
          >
            Add to Cart
          </label>
        </div>
      </div>
    </div>
  );
}

export default inject("cartStore")(observer(ProductCard));
