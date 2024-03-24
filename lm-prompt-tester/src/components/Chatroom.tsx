import styles from "./Chatroom.module.css";
import { useState } from "react";
import OpenAIParameter from "./OpenAIParameter";
import AnthropicParameter from "./AnthropicParameter";
import axios from "axios";

interface ChatroomProps {
  onClose: () => void;
}

const apiIp = import.meta.env.VITE_API_IP;
const apiPort = import.meta.env.VITE_API_PORT;

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

  const onClickSend = (): void => {
    async function parameterSetting() {
      const updatedParameter = {
        ...parameter,
        user_message: userMessage,
        model: model.value,
      };

      await setParameter(updatedParameter);

      const model_response = await axios.post(
        model.made === "OpenAI"
          ? `http://${apiIp}:${apiPort}/openai`
          : model.made === "Anthropic"
          ? `http://${apiIp}:${apiPort}/anthropic`
          : "",
        updatedParameter
      );
      let addedParameter = {};
      if (model.made === "OpenAI") {
        addedParameter = {
          answer: model_response.data.choices[0].message.content,
          response_model: model_response.data.model,
          completion_tokens: model_response.data.usage.completion_tokens,
          prompt_tokens: model_response.data.usage.prompt_tokens,
          total_tokens: model_response.data.usage.total_tokens,
        };
      } else if (model.made === "Anthropic") {
        addedParameter = {
          answer: model_response.data.content[0].text,
          model: model_response.data.model,
          input_tokens: model_response.data.usage.input_tokens,
          output_tokens: model_response.data.usage.output_tokens,
        };
      }

      const requestParameter = { ...updatedParameter, ...addedParameter };
      await axios.post(
        model.made === "OpenAI"
          ? `http://${apiIp}:${apiPort}/history/openai-history`
          : model.made === "Anthropic"
          ? `http://${apiIp}:${apiPort}/history/anthropic-history`
          : "",
        requestParameter
      );
    }
    parameterSetting();
  };

  const [model, setModel] = useState<{
    value: string;
    label: string;
    made: string;
  }>({
    value: "gpt-3.5-turbo",
    label: "GPT-3.5-Turbo",
    made: "OpenAI",
  });

  const [userMessage, setUserMessage] = useState<string>("");

  const [parameter, setParameter] = useState<{ [key: string]: unknown }>({});

  const onSetParameter = (key: string, value: unknown): void => {
    setParameter((prevParameter) => ({
      ...prevParameter,
      [key]: value,
    }));
  };

  const onChangeModel = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedIndex = e.target.selectedIndex;
    const selectedModel = modelList[selectedIndex];
    setModel(selectedModel);
  };

  const onChangeUserMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setUserMessage(e.target.value);
  };

  let parameterList;
  if (model.made === "OpenAI") {
    parameterList = <OpenAIParameter updateParameter={onSetParameter} />;
  } else if (model.made === "Anthropic") {
    parameterList = <AnthropicParameter updateParameter={onSetParameter} />;
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
          <textarea
            className={styles.inputBox}
            onChange={onChangeUserMessage}
          ></textarea>
          <button className={styles.inputButton} onClick={onClickSend}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
