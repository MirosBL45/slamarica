import ContainerCard from "../ContainerCard/ContainerCard";
import styles from "./FinancialOverview.module.scss";
import { demoCategories } from "@/lib/demoCategories";

const INCOME = 5000;

export default function FinancialOverview() {
  

  return (
    <ContainerCard>
      
      <article className={styles.top}>
        <div>
          <div className={styles.label}>Financial Overview</div>
          <div className={styles.amount}>${INCOME.toLocaleString()}</div>
          <div className={styles.small}>Monthly Income</div>
        </div>
      </article>

      <div className={styles.bars}>
        {demoCategories.map((cat) => {
          const value = (INCOME * cat.percent) / 100;

          return (
            <div key={cat.name} className={styles.row}>
              <div className={styles.rowTop}>
                <span>{cat.name}</span>
                <span>${value.toFixed(0)}</span>
              </div>

              <div className={styles.bar}>
                <div
                  className={styles.fill}
                  style={{
                    width: `${cat.percent}%`,
                    background: cat.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
    </ContainerCard>
  );
}
