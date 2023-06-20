/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../../global.css';
import './styles.css';

import { Grid, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { SocketContext } from "../../context/socketContext.js";

import userAPI from '../../services/userAPI';
import { searchRoom } from '../../services/database'

import useDice from '../../hooks/useDice';
import useChat from '../../hooks/useChat';

import ChatComponent from "../../components/chatComponent/ChatComponent.js";
import PasswordPopup from "../../components/PasswordPopupComponent/PasswordPopup";
import Tabletop from '../../components/TabletopComponent';
// import useChat from "../../hooks/useChat.js";

export default function Session(props) {
  const socket = useContext(SocketContext)
  
  const { roomId } = useParams();
  const navigate = useNavigate();
  
  const { rollDice } = useDice();
  const { diceMessage } = useChat(roomId)

  const [isAutenticated, setAutenticated] = useState(false); 
  const [user, setUser] = useState({});
  const [roomInfo, setRoomInfo] = useState({});
  // const { messages, sendMessage } = useChat(roomId);
  // const [newMessage, setNewMessage] = React.useState("");
  async function handleSearchRoom(roomId){
    setRoomInfo(await searchRoom(roomId));
  }

  function handleChangeAuthentication(value){
    setAutenticated(value)
  }

  function handleRollDice(){
    let results = rollDice({num:2, range:6});
    diceMessage(results, user.name, user.avatar_link)
  }

  useEffect(() => {
    handleSearchRoom(roomId);
    var userInfo = JSON.parse(localStorage.getItem('info'));
    if (userInfo && userInfo.uid) {
      setUser(userInfo);
    } else {
      const userAuth = JSON.parse(localStorage.getItem('user'));
      userAPI.getByToken(userAuth.uid).then((response) => {
        localStorage.setItem('info', JSON.stringify(response));
      });
      userInfo = JSON.parse(localStorage.getItem('info'));
      setUser(userInfo);
    }
  }, [roomId]);

    
  if (roomInfo != null) {
    socket.emit('join', roomId);
  }else{
    navigate('/');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {isAutenticated ? 
        <><Box sx={{ flexGrow: 1 }}>
          <Paper sx={{ height: '100vh' }}>         
            <Grid container>
              <Button onClick={handleRollDice}>
                ROLAR DADOS
              </Button>
              <Tabletop/>
            </Grid>
          </Paper>
        </Box>
        <ChatComponent roomId={roomId} /> </> 
    : 
      <PasswordPopup state={isAutenticated} onAuthenticate={handleChangeAuthentication} roomNumber={roomId} />
    }
      
    </Box>
  );
}
