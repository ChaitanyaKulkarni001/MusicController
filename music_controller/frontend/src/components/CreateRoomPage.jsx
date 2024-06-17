import React from 'react'
import '../../static/css/index.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { save } from '../redux/codeRoom/roomCode'
import { useNavigate } from 'react-router-dom';

const CreateRoomPage = () => {
  const [guest_can_pause, setGuest_can_pause] = useState(true)
  const [votes_to_skip, setVotes_to_skip] = useState(2)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleVotesChange=(e) => {

    setVotes_to_skip(e.target.value);

  }

  const handleGuest_can_pause = (e) => {
    const value = e.target.id === 'PlayPause'; // Determine if Play/Pause is selected
    setGuest_can_pause(value);
    console.log(value);
  };
  const handleRommButton=()=>{
    // console.log("guest : ",guest_can_pause,"votes : ",votes_to_skip);
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votes_to_skip,
        guest_can_pause: guest_can_pause,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response data if needed
        console.log(data.code);
        // {dispatch(save(data.code))};
        navigate(`/room/${data.code}`);
      })
      .catch((error) => {
        console.error('Error:', error); // Handle errors if any
      });
  }
  return (
    <>
  
     <div style={{backgroundColor:'gray'}} class ="min-h-screen bg-gray-600 flex justify-center items-center">
  <div className='bg-white rounded-lg shadow-md p-8 w-full md:w-1/2 lg:w-1/3'>
    <h1 className="text-3xl font-bold text-center mb-4">Create a Room</h1>
    <p className="text-gray-500 text-center mb-6">Guest Control of Playback State</p>
    <div className="flex items-center mb-4">
    <label htmlFor="PlayPause" className="mr-4 text-gray-700 flex items-center">
        <input
          type="radio"
          onChange={handleGuest_can_pause}
          checked={guest_can_pause}
          name="control"
          id="PlayPause"
          className="mr-2"
        />
        Play/Pause
      </label>
      <label htmlFor="NoControl" className="text-gray-700 flex items-center">
        <input
          type="radio"
          onChange={handleGuest_can_pause}
          checked={!guest_can_pause}
          name="control"
          id="NoControl"
          className="mr-2"
        />
        No Control
      </label>
    </div>
    <div className="flex items-center mb-4">
      <input className="border border-gray-300 rounded-md p-2 text-center w-16 mr-2" type="number" name="number" id="number" value={votes_to_skip} onChange={handleVotesChange} min="0" placeholder="0" />
      <p className="text-gray-700">Votes Required to Skip Song</p>
    </div>
    <div className="flex flex-col">
      <button style={{backgroundColor:'pink'}} className="bg-pink-500 hover:bg-pink-600 text-white my-3 p-2 rounded-md transition duration-300 ease-in-out" onClick={handleRommButton}>Create a Room</button>
      <button style={{backgroundColor:'blue' , color:'white'}} className="bg-blue-500 hover:bg-blue-600 text-white my-2 p-2 rounded-md transition duration-300 ease-in-out">Back</button>
    </div>
  </div>
</div> 
</>
    
  )
}

export default CreateRoomPage
