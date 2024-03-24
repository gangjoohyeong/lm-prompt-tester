import styles from "./Chatroom.module.css";
import { useState } from "react";
import OpenAIParameter from "./OpenAIParameter";
import AnthropicParameter from "./AnthropicParameter";

interface ChatroomProps {
  onClose: () => void;
}

export default function Chatroom({ onClose }: ChatroomProps): JSX.Element {
  const modelList = [
    { value: "gpt-3.5-turbo", label: "GPT-3.5-Turbo", made: "OpenAI" },
    { value: "gpt-4", label: "GPT-4", made: "OpenAI" },
    {
      value: "claude-3-opus-20240229",
      label: "Claude-3-Opus",
      made: "Anthropic",
    },
    {
      value: "claude-3-sonnet-20240229",
      label: "Claude-3-Sonnet",
      made: "Anthropic",
    },
    {
      value: "claude-3-haiku-20240307",
      label: "Claude-3-Haiku",
      made: "Anthropic",
    },
  ];

  const [model, setModel] = useState<{
    value: string;
    label: string;
    made: string;
  }>({
    value: "gpt-3.5-turbo",
    label: "GPT-3.5-Turbo",
    made: "OpenAI",
  });

  const onChangeModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedModel = modelList[selectedIndex];
    setModel(selectedModel);
  };

  let parameterList;
  if (model.made === "OpenAI") {
    parameterList = <OpenAIParameter />;
  } else if (model.made === "Anthropic") {
    parameterList = <AnthropicParameter />;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.closeChatroomButton} onClick={onClose}>
          ✕
        </div>
        <div>
          Model: {model.label},&nbsp;&nbsp; {model.made}{" "}
        </div>
        <div>
          <select className={styles.selectBox} onChange={onChangeModel}>
            {modelList.map((model) => (
              <option value={model.value} key={model.value}>
                {model.label}
              </option>
            ))}
          </select>
          <div>{parameterList}</div>
        </div>
        <div className={styles.inputContainer}>
          <textarea className={styles.inputBox}></textarea>
          <button className={styles.inputButton}>Send</button>
        </div>
      </div>
    </>
  );
}
