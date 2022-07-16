import styles from "../styles/index.module.scss";

export default function ProductCard({ title, description }) {
  return (
    <div className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
    </div>
  );
}
