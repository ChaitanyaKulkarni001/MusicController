import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

// console.log(roomCode);
const Homepage = () => {
  const roomCode = useSelector((state) => state.roomCode.value)
  return (
    <div>
      roomCode is {roomCode}
      Homepage of the Project

      <h1 className='bg-black text-white' >Hey</h1>
    </div>
  )
}

export default Homepage
