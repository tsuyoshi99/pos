import styles from "../styles/Home.module.css";

export default function ProductCard({ title, price }) {
  return (
    <div className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>$ {price}</p>
    </div>
  );
}
