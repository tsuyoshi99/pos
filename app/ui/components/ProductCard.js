import styles from '../styles/Home.module.css'

export default function ProductCard({ title }) {
  return (
    <a href="https://nextjs.org/docs" className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>Find in-depth information about Next.js features and API.</p>
    </a>
  );
}
