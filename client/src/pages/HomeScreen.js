import React from 'react'
import SideBar from '../components/SideBar'
import {Box} from '@mui/material'
import {Route,Routes} from 'react-router-dom'
import Welcome from '../components/Welcome'
import ChatScreen from '../components/ChatScreen'


const AllRoutes = ()=> {
    return (
        <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/:id/:name" element={<ChatScreen/>} />
        </Routes>
    )
}
const HomeScreen = ({setloggedIn}) => {
  return (
    <Box
    display="flex">
        <SideBar setloggedIn={setloggedIn}/>
        <AllRoutes />
    </Box>
  )
}

export default HomeScreen