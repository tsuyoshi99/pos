import * as React from "react";
import { inject, observer } from "mobx-react";

function ProductCard(props) {
  const { activeProduct, setActiveProduct } = props.activeProduct;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{props.product.name} &rarr;</h2>
        <p>{props.product.quantity}</p>
        <p>{props.product.inventory[0]["name"]}</p>
        <div className="card-actions justify-end">
          <label
            htmlFor="my-modal"
            className="btn btn-outline btn-primary"
            onClick={() => {
              setActiveProduct(props.product);
            }}
          >
            Add to Cart
          </label>
        </div>
      </div>
    </div>
  );
}

export default inject("activeProduct")(observer(ProductCard));
