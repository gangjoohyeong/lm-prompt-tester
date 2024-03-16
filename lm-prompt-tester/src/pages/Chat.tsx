import { useState } from "react";
import Chatroom from "../components/Chatroom";
import styles from "./Chat.module.css";

const MAX_CHATROOMS: number = 2;

const Chat = () => {
  const [chatroomIds, setChatroomIds] = useState<number[]>([]);

  const onClickCreateChatroom: () => void = () => {
    if (chatroomIds.length < MAX_CHATROOMS) {
      setChatroomIds([...chatroomIds, Date.now()]);
    }
  };

  const onClickCloseChatroom = (closeChatroomId: number) => {
    setChatroomIds(
      chatroomIds.filter((chatroomId) => chatroomId !== closeChatroomId)
    );
  };

  const chatroomElements = chatroomIds.map((chatroomId) => (
    <div key={chatroomId}>
      <Chatroom onClose={() => onClickCloseChatroom(chatroomId)} />
    </div>
  ));

  return (
    <>
      <div className={styles.createChatroomButtonContainer}>
        {chatroomIds.length < MAX_CHATROOMS && (
          <button
            className={styles.createChatroomButton}
            onClick={onClickCreateChatroom}
          >
            New Chat
          </button>
        )}
      </div>
      <div className={styles.chatroomContainer}>{chatroomElements}</div>
    </>
  );
};

export default Chat;
