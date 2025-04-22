import { useState } from "react";
// import { Assistant } from "./assistants/openai";
import { Assistant } from "./assistants/googleai";
import { Chat } from "./components/Chat/Chats";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";


function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    try {
      const result = await assistant.chat(content);
      // const result = await assistant.chat(content, messages);
      addMessage({ content: result, role: "assistant" });
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
    }
  }
  // https://github.com/AjeetKu143/AI-ChatBot.git

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="robot.svg" />
        <h2 className={styles.Title}>AI ChatBot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;