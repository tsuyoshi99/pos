import styles from "../styles/Home.module.css";

export default function ProductCard({ title, price }) {
  return (
    <a href="#" className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>$ {price}</p>
    </a>
  );
}
