import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate,Navigate } from 'react-router-dom';

import CreateRoomPage from './CreateRoomPage.jsx';
// import Room from './Room.jsx'
// import './logos/settings.svg    '
const Room = ({setRoom}) => {
    const [guest_can_pause, setGuest_can_pause] = useState(false);
    const [votes_to_skip, setVotes_to_skip] = useState(2);
    const [isHost, setIsHost] = useState(false);
    const [setting, setsetting] = useState(false)
    const { roomcode } = useParams();
    const navigate = useNavigate();

    const getRoomDetails = () => {
        fetch(`/api/get-room?code=${roomcode}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setGuest_can_pause(data.guest_can_pause);
                setVotes_to_skip(data.votes_to_skip);
                setIsHost(data.is_host);
            });
    };

    useEffect(() => {
        getRoomDetails();
    },[]); 

    const leaveRoom = () => {
        // Add logic to leave the room, e.g., redirect or perform an action
        console.log("Leaving room...");
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };

          fetch("/api/leave-room", requestOptions).then((r)=>{
            setRoom(null)
            navigate(`/`);
        })
    };
    
    

        if (setting){
            return (
                <>
                <CreateRoomPage update={true} code = {roomcode} guest_can_pauses={guest_can_pause} votes_to_skips={votes_to_skip} />
                <button className='bg-pink-700 text-white p-6 mr-10 rounded-full hover:bg-yellow-700 fixed right-10 top-10 ' onClick={()=>{setsetting(false)}}>Back to Room</button>

                </>
            )
        }
    return (
        <div className="min-h-screen bg-gray-600 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-8 w-full md:w-1/2 lg:w-1/3">
        <span class="material-symbols-outlined flex justify-end align-top hover:cursor-pointer" onClick={()=>{setsetting(true)}}>
settings
</span>
                <h1 className="text-3xl font-bold text-center mb-4">Room Code: {roomcode}</h1>
                <div className="flex flex-col items-center">
                    <p className="text-gray-700 mb-2">
                        Votes to skip: {votes_to_skip}
                    </p>
                    <p className="text-gray-700 mb-2">
                        Guest can pause: {guest_can_pause.toString()}
                    </p>
                    <p className="text-gray-700 mb-2">
                        Host: {isHost.toString()}
                    </p>
                    
                    <button
                        onClick={leaveRoom}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out"
                    >
                        Leave Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Room;
