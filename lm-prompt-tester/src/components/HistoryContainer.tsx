// HistoryContainer.js

import React, { useState, useEffect } from "react";
import styles from "./HistoryContainer.module.css";
import axios from "axios";

const apiIp = import.meta.env.VITE_API_IP;
const apiPort = import.meta.env.VITE_API_PORT;

interface History {
  id: number;
  user_message: string;
  system_message: string;
  answer: string;
  model: string;
  create_date: string;
}

export default function HistoryContainer() {
  const [histories, setHistories] = useState<History[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const historiesPerPage = 10;

  useEffect(() => {
    async function fetchHistories() {
      try {
        const response = await axios.get(`http://${apiIp}:${apiPort}/history`);
        setHistories(response.data);
      } catch (error) {
        console.error("Error fetching histories:", error);
      }
    }
    fetchHistories();
  }, []);

  const indexOfLastHistory = currentPage * historiesPerPage;
  const indexOfFirstHistory = indexOfLastHistory - historiesPerPage;
  const currentHistories = histories.slice(
    indexOfFirstHistory,
    indexOfLastHistory
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className={styles.HistoryContainer}>
        <table className={styles.historyTable}>
          <thead>
            <tr>
              <th>User Message</th>
              <th>System Message</th>
              <th>Answer</th>
              <th>Model</th>
              <th>Create Date</th>
            </tr>
          </thead>
          <tbody>
            {currentHistories.map((history) => (
              <tr key={history.id}>
                <td>{history.user_message}</td>
                <td>{history.system_message}</td>
                <td>{history.answer}</td>
                <td>{history.model}</td>
                <td>{new Date(history.create_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(histories.length / historiesPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={styles.pageButton}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </>
  );
}
