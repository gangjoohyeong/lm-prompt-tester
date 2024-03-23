import { useEffect, useState } from "react";
import styles from "./APISetting.module.css";
import axios from "axios";

interface APISettingProps {
  ApiName: string;
  ApiDbName: string;
}

export default function APISetting({
  ApiName,
  ApiDbName,
}: APISettingProps): JSX.Element {
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api-keys/${ApiDbName}`);
        setApiKey(response.data.key);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  return (
    <>
      <div>
        <div>{ApiName} API</div>
        <div className={styles.inputContainer}>
          <input className={styles.inputBox} value={apiKey}></input>
          <button className={styles.inputButton}>Send</button>
        </div>
      </div>
    </>
  );
}
