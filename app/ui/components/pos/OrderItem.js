import * as React from "react";
import { inject, observer } from "mobx-react";

function OrderItem(props) {
  const { cart, cartUI, removeFromCart } = props.cartStore;

  return (
    <React.Fragment>
      {props.product.inventory.map((item, index) => (
        <React.Fragment key={index}>
          {item["quantity"] !== 0 && (
            <div className="grid grid-cols-3 items-center">
              <div>{props.product.name}</div>
              <div>
                x {item.quantity} {item.name}
              </div>
              <div className="flex flex-row items-center justify-between">
                {/* <div>$ {item.price}</div> */}
                <div>
                  <span className="mr-1">$</span>
                  <input
                    type="number"
                    min="1"
                    onFocus={(e) => e.target.select()}
                    className="input max-h-8 w-16 p-1 text-base bg-transparent"
                    value={item.price} // form.quantity
                    onChange={(e) => {
                      item.price = Number(e.target.value);
                    }}
                  />
                </div>

                <button
                  className="btn btn-square btn-error my-1"
                  onClick={() => {
                    item.quantity = 0;
                  }}
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
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

export default inject("cartStore")(observer(OrderItem));
