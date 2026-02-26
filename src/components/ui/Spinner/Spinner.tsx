import styles from './Spinner.module.scss';

export default function Spinner({ text }: { text: string }) {
  return (
    <div className={styles.bigContaner}>
      <p>{text}</p>
      <div className={styles.loadingSpinnerContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    </div>
  )
}
