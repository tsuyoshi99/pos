import * as React from "react";
import { inject, observer } from "mobx-react";

function ProductCard(props) {
  const { activeProduct, setActiveProduct } = props.activeProduct;

  return (
    <div className="card bg-base-100 shadow-xl border">
      <div className="card-body">
        <h2 className="card-title">{props.product.name} &rarr;</h2>
        <p>{props.product.quantity}</p> {/*props.product.description*/}
        <div className="card-actions justify-end mt-2">
          <label
            htmlFor="my-modal"
            className="btn btn-sm lg:btn-md btn-outline"
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
