import React from "react";
import Head from "next/head";
import styles from "../styles/index.module.scss";
import { inject, observer } from "mobx-react";

import NavBar from "../components/NavBar";
import SaleCard from "../components/SaleCard";

function SalesHistory(props) {
  const { sales, getAllSales } = props.salesStore;

  React.useEffect(() => {
    getAllSales();
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <div className={styles.container}>
        <Head>
          <title>Sales History</title>
          <meta
            name="description"
            content="Point of Sale dedicated for Pharmacy."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sales.map((sale) => {
              return (
                <div className="cursor-pointer" key={sale.id}>
                  <SaleCard saleHistory={sale} />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

export default inject("salesStore")(observer(SalesHistory));
