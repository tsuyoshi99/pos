export default function SaleCard(props) {
  const sale = props.saleHistory;
  const date = convertDate(sale.createdAt);

  function convertDate(date) {
    const formatYmd = (date) => date.toISOString().slice(0, 10);

    // Example
    formatYmd(new Date());

    // formatYmd.split("-").reverse().join("-");
    return formatYmd;
  }
  return (
    <div className="card bg-base-100 shadow-xl border">
      <div className="card-body">
        <h2 className="card-title">{props.saleHistory.user.email}</h2>
        <div className="flex justify-between">
          <p>Total cost: {sale.total}</p>
          <p>Purchased on: {date}</p>
        </div>
      </div>
    </div>
  );
}
