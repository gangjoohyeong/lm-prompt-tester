import styles from "./Footer.module.css";

export default function Footer(): JSX.Element {
  return (
    <>
      <footer className={styles.footer}>
        <p className={styles.text}>
          Copyright 2024. gangjoohyeong All rights reserved.
        </p>
      </footer>
    </>
  );
}
