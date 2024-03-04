import React, { useState,useEffect, useCallback } from 'react';
import {useSocket} from "./context/Socketprovider"
import {useNavigate} from "react-router-dom"
const Lobby = () => {
  const [formData, setFormData] = useState({
    name: '',
    roomId: '',
  });
  
  const socket = useSocket();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("room:join", { name: formData.name, roomId: formData.roomId });
    console.log('Form submitted with data:', formData);
  };

  const handleJoinRoom = useCallback(({name,roomId})=>{
    const Naame = name;
    const RooomId = roomId;
    console.log(Naame,RooomId)
    navigate(`/room/${RooomId}`)
  },[navigate])
  
  useEffect(() => {
    socket.on("room:join",handleJoinRoom);
    return()=>{
      socket.off('room:join',handleJoinRoom)
    }
  }, [socket])
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Room ID:
        <input
          type="text"
          name="roomId"
          value={formData.roomId}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Lobby;
