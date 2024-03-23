import { useEffect, useState } from "react";
import styles from "./APISetting.module.css";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface APISettingProps {
  ApiName: string;
  ApiDbName: string;
}

export default function APISetting({
  ApiName,
  ApiDbName,
}: APISettingProps): JSX.Element {
  const [apiKey, setApiKey] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiUrl}/api-keys/${ApiDbName}`);
        setApiKey(response.data.key);
        if (response.data.key === "") {
          setIsEditing(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ApiDbName]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };
  const onSendButtonClick = async () => {
    try {
      setIsLoading(true);
      // API Key가 비어있을 때
      if (isEditing) {
        const isExistApi = await axios.get(`${apiUrl}/api-keys/${ApiDbName}`);

        // DB에 해당 API key가 존재하지 않을 때
        if (isExistApi.data.key === "") {
          const requestData = {
            name: ApiDbName,
            key: apiKey,
          };
          const response = await axios.post(`${apiUrl}/api-keys`, requestData);
          setApiKey(response.data.key);
          setIsEditing(false);
          // DB에 해당 API key가 존재할 때
        } else {
          const requestData = {
            new_key: apiKey,
          };
          const response = await axios.patch(
            `${apiUrl}/api-keys/${ApiDbName}`,
            requestData
          );
          setApiKey(response.data.key);
          setIsEditing(false);
        }
        // API가 이미 등록되어 있을 때
      } else {
        setApiKey("");
        setIsEditing(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendButtonText = isEditing ? "Apply" : "Update";
  const displayedApiKey = isEditing ? apiKey : "●".repeat(apiKey.length);

  return (
    <>
      {isLoading ? (
        <h3 className={styles.loading}>Loading ...</h3>
      ) : (
        <div>
          <div>{ApiName} API</div>
          <div className={styles.inputContainer}>
            <input
              className={styles.inputBox}
              value={displayedApiKey}
              disabled={!isEditing}
              onChange={onChangeInput}
            ></input>
            <button className={styles.inputButton} onClick={onSendButtonClick}>
              {sendButtonText}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
