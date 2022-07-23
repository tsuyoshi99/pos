export default function ConfirmDialog(props) {
  const { title, message, confirmText, cancelText, onConfirm, onCancel } =
    props;
  return (
    <label className="modal cursor-pointer">
      <label className="modal-box relative max-w-xs" htmlFor="">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="pt-4">{message}</p>
        <div className="flex justify-end">
          <div className="modal-action">
            <label
              htmlFor="confirm-dialog"
              className="btn btn-outline mr-2"
              onClick={onCancel}
            >
              {cancelText}
            </label>
          </div>
          <div>
            <input
              type="button"
              className="modal-action btn"
              htmlFor="confirm-dialog"
              value={confirmText}
              onClick={onConfirm}
            />
          </div>
        </div>
      </label>
    </label>
  );
}
