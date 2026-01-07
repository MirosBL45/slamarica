import ForSave from '@/components/ForSave';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Slamarica</h1>
      <ForSave />
    </div>
  );
}
