import styles from "./APISetting.module.css";

export default function APISetting(): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <h2>API</h2>
        <div>
          <div>OpenAI API</div>
          <div className={styles.inputContainer}>
            <input className={styles.inputBox}></input>
            <button className={styles.inputButton}>Send</button>
          </div>
        </div>
        <div>
          <div>Anthropic API</div>
          <div className={styles.inputContainer}>
            <input className={styles.inputBox}></input>
            <button className={styles.inputButton}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}
