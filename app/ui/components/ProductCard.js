import styles from "../styles/Home.module.css";

export default function ProductCard({ title, price }) {
  return (
    <a href="https://nextjs.org/docs" className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>$ {price}</p>
    </a>
  );
}
