// HistoryContainer.js

import React, { useState, useEffect } from "react";
import styles from "./HistoryContainer.module.css";
import axios from "axios";

const apiIp = import.meta.env.VITE_API_IP;
const apiPort = import.meta.env.VITE_API_PORT;

interface Message {
  id: number;
  user_message: string;
  system_message: string;
  answer: string;
  model: string;
  create_date: string;
}

export default function HistoryContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 3;

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get(`http://${apiIp}:${apiPort}/history`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Get current messages
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.messageList}>
      <table className={styles.messageTable}>
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
          {currentMessages.map((message) => (
            <tr key={message.id}>
              <td>{message.user_message}</td>
              <td>{message.system_message}</td>
              <td>{message.answer}</td>
              <td>{message.model}</td>
              <td>{new Date(message.create_date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from(
          { length: Math.ceil(messages.length / messagesPerPage) },
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
    </div>
  );
}
