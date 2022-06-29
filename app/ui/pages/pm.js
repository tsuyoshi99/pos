import Head from "next/head";
import styles from "../styles/Home.module.css";
import style from "../styles/index.module.scss";

export default function ProductManagement() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Product Management</title>
        <meta
          name="description"
          content="Point of Sale dedicated for Pharmacy."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={style.wide}>Product Management</div>
      </main>
    </div>
  );
}
