import { Link } from "react-router-dom";
import styles from "./Header.module.css"; // 파일 경로는 실제 구조에 맞게 조정해주세요.

export default function Header(): JSX.Element {
  return (
    <>
      <header className={styles.header}>
        <Link className={styles.link} to="/">
          LM PROMPT TESTER
        </Link>
        <nav className={styles.nav}>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
          <Link className={styles.navLink} to="/chat">
            Chat
          </Link>
          <Link className={styles.navLink} to="/history">
            History
          </Link>
          <Link className={styles.navLink} to="/settings">
            Settings
          </Link>
        </nav>
      </header>
    </>
  );
}
