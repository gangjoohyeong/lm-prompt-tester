import { useEffect, useState } from "react";
import styles from "./APISetting.module.css";
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;

async function apiUpdateCheckAlert(): Promise<boolean> {
  const result = await Swal.fire({
    title: "Are you sure you want to update the API key?",
    text: "This action will remove the existing API key.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "black",
    cancelButtonColor: "gray",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    customClass: {
      confirmButton: styles.customButton,
      cancelButton: styles.customButton,
      popup: styles.customPopup,
    },
  });

  return result.isConfirmed;
}

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
      // API Key가 비어있을 때
      if (isEditing) {
        setIsLoading(true);
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
        if (await apiUpdateCheckAlert()) {
          setApiKey("");
          setIsEditing(true);
        }
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
          <div>{ApiName} API key</div>
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
