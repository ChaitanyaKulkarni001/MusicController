import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route ,Redirect, Navigate} from "react-router-dom"; // Import Routes
import Homepage from './Homepage.jsx'
import CreateRoomPage from './CreateRoomPage.jsx'
import RoomjoinPage from './RoomjoinPage.jsx'
import Room from './Room.jsx';
// import '../../static/css/index.css'
// import '../../output.css'; 
import '../index.css';
import { store } from '../redux/store.js';
import {Provider} from 'react-redux';
import {useEffect, useState } from 'react';
import UpdateRoom from './UpdateRoom.jsx';
// import '../index.css'
const App = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/user-in-room");
      const data = await response.json();
      setRoomCode(data.code);
    };

    fetchData();
  }, []);
  return (
    <div>
       <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<CreateRoomPage update={false} code={0} />} />
          <Route path="/join" element={<RoomjoinPage />} />
          <Route path="/update" element={<UpdateRoom />} />
          <Route path="/room/:roomcode" element={<Room setRoom={setRoomCode}/>} />
          
          {/* <Route path="/" element={<Homepage />} /> */}
          
        {roomCode ? (
          <Route  element={<Navigate to={`/room/${roomCode}`} replace />} />
        ) : (
          <Route path="/" element={<Homepage roomCode={roomCode} />} />)}
          
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App

const appDiv = document.getElementById("app");
render(<App />, appDiv)

