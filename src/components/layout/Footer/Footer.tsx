import Link from "next/link";
import styles from "./Footer.module.scss";
import { GithubOutlined, LinkedinOutlined, XOutlined } from "@ant-design/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* left */}
        <div className={styles.brand}>
          <h3>Household</h3>
          <p>Smart family budget manager</p>
        </div>

        {/* center */}
        <div className={styles.links}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* right */}
        <div className={styles.icons}>
          <Link
            href="https://www.linkedin.com/in/mj888/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined />
          </Link>

          <Link
            href="https://github.com/MirosBL45"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined />
          </Link>

          <Link
            href="https://x.com/MiroslavJovic45"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XOutlined />
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        © {currentYear} Household • Built by{" "}
        <Link
          href="https://miroslavjovic.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Miroslav Jović
        </Link>
      </div>
    </footer>
  );
}
