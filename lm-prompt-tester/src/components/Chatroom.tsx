import styles from "./Chatroom.module.css";

interface ChatroomProps {
  onClose: () => void;
}

export default function Chatroom({ onClose }: ChatroomProps): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.closeChatroomButton} onClick={onClose}>
          ✕
        </div>
        <div>질문내용</div>
        <div>답변내용</div>
        <div className={styles.inputContainer}>
          <input className={styles.inputBox}></input>
          <button className={styles.inputButton}>Send</button>
        </div>
        <div>
          모델 이름: gpt-3.5-turbo, 파라미터:
          {`{"temperature": 0.7, "max_tokens": 150}`}
        </div>
        <div>
          <select>
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            <option value="palm 2">palm 2</option>
            <option value="gemma 2b">gemma 2b</option>
          </select>
        </div>
      </div>
    </>
  );
}
