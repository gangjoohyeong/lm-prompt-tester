import styles from "./Chatroom.module.css";
import React, { useState } from "react";
import OpenAIParameter from "./OpenAIParameter";
import AnthropicParameter from "./AnthropicParameter";
import axios from "axios";
import { toast } from "react-toastify";

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
    if (userMessage === "") {
      toast.error("Please type your message");
      return;
    }

    setSendButtonDisabled(true);
    setUserMessageBoxDisabled(true);
    setViewAnswerContainer(false);
    async function parameterSetting() {
      const updatedParameter = {
        ...parameter,
        user_message: userMessage,
        model: model.value,
      };

      await setParameter(updatedParameter);

      try {
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
        const requestParameter: {
          [key: string]: string | number;
        } = { ...updatedParameter, ...addedParameter };
        try {
          await axios.post(
            model.made === "OpenAI"
              ? `http://${apiIp}:${apiPort}/history/openai-history`
              : model.made === "Anthropic"
              ? `http://${apiIp}:${apiPort}/history/anthropic-history`
              : "",
            requestParameter
          );
        } catch (error) {
          console.error("Error posting history:", error);
        }
        setUserMessageAndAnswer({
          userMessage: userMessage,
          answer: requestParameter.answer as string,
        });
        setViewAnswerContainer(true);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status == 404) {
            toast.error("API Key is not set");
          } else {
            toast.error("Error occurred while sending message");
          }
        }
      } finally {
        setSendButtonDisabled(false);
        setUserMessageBoxDisabled(false);
        setUserMessage("");
      }
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

  const [userMessageBoxDisabled, setUserMessageBoxDisabled] =
    useState<boolean>(false);
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false);

  const [userMessageAndAnswer, setUserMessageAndAnswer] = useState<{
    userMessage: string;
    answer: string;
  }>({ userMessage: "", answer: "" });

  const [viewAnswerContainer, setViewAnswerContainer] =
    useState<boolean>(false);

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

  const userMessageBoxOnKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onClickSend();
    }
  };

  let parameterList;
  if (model.made === "OpenAI") {
    parameterList = <OpenAIParameter updateParameter={onSetParameter} />;
  } else if (model.made === "Anthropic") {
    parameterList = <AnthropicParameter updateParameter={onSetParameter} />;
  }

  return (
    <>
      <div className={styles.parentContainer}>
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
              value={userMessage}
              onChange={onChangeUserMessage}
              disabled={userMessageBoxDisabled}
              onKeyDown={userMessageBoxOnKeyDown}
              placeholder="Type your message here..."
            ></textarea>
            <button
              className={styles.inputButton}
              onClick={onClickSend}
              disabled={sendButtonDisabled}
            >
              Send
            </button>
          </div>
        </div>
        {viewAnswerContainer ? (
          <div className={styles.answerContainer}>
            <h4>User message</h4>
            <div>{userMessageAndAnswer.userMessage}</div>
            <h4>Response</h4>
            <div>{userMessageAndAnswer.answer}</div>
          </div>
        ) : null}
      </div>
    </>
  );
}
