import styles from "./APIContainer.module.css";
import APISetting from "./APISetting";

export default function APIContainer(): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <h3>Registry LM API</h3>
        <APISetting ApiName="OpenAI" ApiDbName="OpenAI" />
        <APISetting ApiName="Anthropic" ApiDbName="Anthropic" />
      </div>
    </>
  );
}
