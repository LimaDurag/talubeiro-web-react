import React, {useState, useContext, useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../../global.css';
import './styles.css';

import { SocketContext } from "../../context/socketContext.js";

import ChatComponent from "../../components/chatComponent/ChatComponent.js";
// import useChat from "../../hooks/useChat.js";

export default function Session(props) {
  const socket = useContext(SocketContext)
  const { roomId } = useParams();
  // const { messages, sendMessage } = useChat(roomId);
  // const [newMessage, setNewMessage] = React.useState("");
  socket.emit('join',roomId)

  useEffect(()=>{
  }, [])

  return (
    <>
      <ChatComponent roomId={roomId}/>
    </>
  );
}
