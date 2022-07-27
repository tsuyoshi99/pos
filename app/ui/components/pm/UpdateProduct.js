export default function UpdateProduct() {
  return (
    <div className="modal">
      <div className="modal-box relative" htmlFor="">
        <h1>Update Product</h1>
        {/* Action Buttons */}
        <div className="flex justify-end">
          <div className="modal-action">
            <label
              className="btn btn-outline mr-2"
              htmlFor="update-product-modal"
              // onClick={resetForm}
            >
              Cancel
            </label>
          </div>
          <input
            type="button"
            className="modal-action btn"
            htmlFor="update-product-modal"
            value="Update"
            // onClick={(e) => handleSubmit(  e)}
          />
        </div>
      </div>
    </div>
  );
}
