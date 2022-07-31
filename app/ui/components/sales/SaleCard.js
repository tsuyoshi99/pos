import { useTranslation } from "next-i18next";

export default function SaleCard(props) {
  const { t } = useTranslation();
  const sale = props.saleHistory;

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
          <p className="text-end">
            {t("common:date", {
              val: sale.createdAt,
              formatParams: {
                val: {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              },
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
