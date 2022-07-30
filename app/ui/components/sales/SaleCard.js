export default function SaleCard(props) {
  const sale = props.saleHistory;
  const date = Date.parse(sale.createdAt);

  return (
    <div className="card bg-base-100 shadow-xl border">
      <div className="card-body">
        <h2 className="card-title">{props.saleHistory.user.email}</h2>
        <div className="flex justify-between">
          <p>Total cost: </p>
          <p className="text-end">${sale.total}</p>
        </div>
        <div className="flex justify-between">
          <p>Purchased on: </p>
          <p className="text-end">{date}</p>
        </div>
      </div>
    </div>
  );
}
