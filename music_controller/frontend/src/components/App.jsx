import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Routes
import Homepage from './Homepage.jsx'
import CreateRoomPage from './CreateRoomPage.jsx'
import RoomjoinPage from './RoomjoinPage.jsx'
import Room from './Room.jsx';
import '../../static/css/index.css'
import '../../output.css'; 
import { store } from '../redux/store.js';
import {Provider} from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
// import '../index.css'
const App = () => {
  return (
    <div>
       <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/join" element={<RoomjoinPage />} />
          <Route path="/room/:roomcode" element={<Room/>} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
      {/* <Homepage/> */}
      </Provider>
    </div>
  )
}

export default App

const appDiv = document.getElementById("app");
render(<App />, appDiv)
