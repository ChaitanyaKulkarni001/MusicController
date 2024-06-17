import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
const Room = () => {
    // const roomCode1 = useSelector((state) => state.roomCode.value)
    // const [roomCode, setRoomCode] = useState(roomCode1)
    const [guest_can_pause, setGuest_can_pause] = useState(false)
    const [votes_to_skip, setVotes_to_skip] = useState(2)
    const [isHost, setIsHost] = useState(false)
    const { roomcode } = useParams();
    console.log(roomcode);
    const getRoomDetails=()=>{
            fetch('api/get-room/?code='+ roomcode).then((res)=> res.json())
            .then((data)=>{
                setGuest_can_pause(data.Guest_can_pause)
                setVotes_to_skip(data.votes_to_skip)
                setIsHost(data.isHost)
            })
    }
    useEffect(()=>{
        getRoomDetails()
    },[])
  return (
    <div>
        <h1>Code : {roomcode}</h1>
      <p>
        votes_to_skip : {votes_to_skip} <br />
        guest_can_pause : {guest_can_pause.toString()} <br />
        isHost : {isHost.toString()}
      </p>
    </div>
  )
}

export default Room
