import { useState } from "react";
import styles from "./ChatroomMaxCount.module.css";

export default function ChatroomMaxCount(): JSX.Element {
  const [maxChatrooms, setMaxChatrooms] = useState<number>(2);

  const onClickDecrease = () => {
    if (maxChatrooms > 1) {
      setMaxChatrooms(maxChatrooms - 1);
    }
  };
  const onClickIncrease = () => {
    if (maxChatrooms < 5) {
      setMaxChatrooms(maxChatrooms + 1);
    }
  };
  return (
    <>
      <div>
        <div>Maximum chatroom creation limit</div>
        <div className={styles.inputContainer}>
          <button className={styles.inputButton} onClick={onClickDecrease}>
            -
          </button>
          {maxChatrooms}
          <button className={styles.inputButton} onClick={onClickIncrease}>
            +
          </button>
        </div>
      </div>
    </>
  );
}
