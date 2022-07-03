import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { io } from 'socket.io-client';
import ActiveUsers from "./components/ActiveUsers";
import DisplayMessages from "./components/DisplayMessages";
import SignIn from "./components/SignIn";
import CryptoJS from 'crypto-js';

function App() {
  const secretKey = "HireMyTech"
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const client = useRef();

  useEffect(()=>{
    client.current = io.connect("http://localhost:5000");
    
    if (client.current) {
      client.current.on("user-already-created", () => {
        toast.error("User already created")
      });

      client.current.on("user-created", () => {
        setConnected(true);
      });

      client.current.on("get-active-users", (users) => {
        console.log(username)
        setActiveUsers(users.filter(user => user.username !== username));
      });

      client.current.on("request", (msg) => {
        msg.message = CryptoJS.AES.decrypt(msg.message, secretKey).toString(CryptoJS.enc.Utf8);
        setMessages(previous => [...previous, msg]);
      });
    }

    return () => {
      if (client.current) {
        client.current.disconnect();
        client.current = undefined;
      }
    }

  }, [username]);

  const handleConnection = () => {
    if (client.current) {
      client.current.emit("handle-connection", username);
    }
  };

  const handleMessage = () => {
    if (client.current) {
      setMessages(previous => [...previous, {message, username}])
      var encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString()
      client.current?.emit("send-message", {message: encryptedMessage, username});
      setMessage("");
    }
  };

  return (
    <div className="app">
      {
        !connected && 
        <SignIn username={username} setUsername={setUsername} handleConnection={handleConnection} />
      }
      {
        connected && 
        <>
        <ActiveUsers activeUsers={activeUsers} />
        <DisplayMessages message={message} setMessage={setMessage} messages={messages} username={username} handleMessage={handleMessage} />
        </>
      }

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
