import { useState } from "react";
import styles from "./AnthropicParameter.module.css";

export default function AnthropicParameter(): JSX.Element {
  const [systemMessage, setSystemMessage] = useState<string>(
    "Respond only in Yoda-speak."
  );
  const [maxTokens, setMaxTokens] = useState<number>(1024);
  const [topP, setTopP] = useState<number>(1.0);
  const [temperature, setTemperature] = useState<number>(1.0);

  return (
    <div className={styles.parameterContainer}>
      <label className={styles.parameter}>
        System message
        <input
          className={styles.inputTextBox}
          type="text"
          value={systemMessage}
          onChange={(e) => setSystemMessage(e.target.value)}
        />
      </label>

      <label className={styles.parameter}>
        Max tokens
        <input
          className={styles.inputNumberBox}
          type="number"
          value={maxTokens}
          min={1}
          onChange={(e) => setMaxTokens(Number(e.target.value))}
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
          onChange={(e) => setTopP(Number(e.target.value))}
        />
        <span>{topP}</span>
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
          onChange={(e) => setTemperature(Number(e.target.value))}
        />
        <span>{temperature}</span>
      </label>
    </div>
  );
}
