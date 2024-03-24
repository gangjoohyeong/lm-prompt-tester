import { useState, useEffect } from "react";
import styles from "./OpenAIParameter.module.css";

interface updateParameterProps {
  updateParameter: (key: string, value: unknown) => void;
}

export default function OpenAIParameter({
  updateParameter,
}: updateParameterProps): JSX.Element {
  const [systemMessage, setSystemMessage] = useState<string>(
    "You are a helpful assistant."
  );
  const [maxTokens, setMaxTokens] = useState<number>(2048);
  const [topP, setTopP] = useState<number>(1.0);
  const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0.0);
  const [presencePenalty, setPresencePenalty] = useState<number>(0.0);
  const [temperature, setTemperature] = useState<number>(0.0);

  useEffect(() => {
    updateParameter("system_message", systemMessage);
    updateParameter("max_tokens", maxTokens);
    updateParameter("top_p", topP);
    updateParameter("frequency_penalty", frequencyPenalty);
    updateParameter("presence_penalty", presencePenalty);
    updateParameter("temperature", temperature);
  }, []);

  return (
    <div className={styles.parameterContainer}>
      <label className={styles.parameter}>
        System message
        <input
          className={styles.inputTextBox}
          type="text"
          value={systemMessage}
          onChange={(e) => {
            setSystemMessage(e.target.value);
            updateParameter("system_message", e.target.value);
          }}
        />
      </label>

      <label className={styles.parameter}>
        Max tokens
        <input
          className={styles.inputNumberBox}
          type="number"
          value={maxTokens}
          min={1}
          onChange={(e) => {
            setMaxTokens(Number(e.target.value));
            updateParameter("max_tokens", e.target.value);
          }}
        />
      </label>

      <label className={styles.parameter}>
        Top p
        <input
          className={styles.inputRangeBox}
          type="range"
          value={topP}
          min={0.0}
          max={1.0}
          step="0.01"
          onChange={(e) => {
            setTopP(Number(e.target.value));
            updateParameter("top_p", e.target.value);
          }}
        />
        <span>{topP}</span>
      </label>

      <label className={styles.parameter}>
        Frequency penalty
        <input
          className={styles.inputRangeBox}
          type="range"
          value={frequencyPenalty}
          min={-2.0}
          max={2.0}
          step="0.1"
          onChange={(e) => {
            setFrequencyPenalty(Number(e.target.value));
            updateParameter("frequency_penalty", e.target.value);
          }}
        />
        <span>{frequencyPenalty}</span>
      </label>

      <label className={styles.parameter}>
        Presence penalty
        <input
          className={styles.inputRangeBox}
          type="range"
          value={presencePenalty}
          min={-2.0}
          max={2.0}
          step="0.1"
          onChange={(e) => {
            setPresencePenalty(Number(e.target.value));
            updateParameter("presence_penalty", e.target.value);
          }}
        />
        <span>{presencePenalty}</span>
      </label>

      <label className={styles.parameter}>
        Temperature
        <input
          className={styles.inputRangeBox}
          type="range"
          value={temperature}
          min={0.0}
          max={1.0}
          step="0.01"
          onChange={(e) => {
            setTemperature(Number(e.target.value));
            updateParameter("temperature", e.target.value);
          }}
        />
        <span>{temperature}</span>
      </label>
    </div>
  );
}
