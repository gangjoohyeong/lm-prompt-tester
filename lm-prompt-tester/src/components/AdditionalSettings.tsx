import styles from "./AdditionalSettings.module.css";
import ChatroomMaxCount from "./ChatroomMaxCount";

export default function AdditionalSettings(): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <h3>Additional settings</h3>
        <ChatroomMaxCount />
      </div>
    </>
  );
}
