import React from 'react'
import {Box,Typography,Divider,Stack} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import UserCard from './UserCard'
const SideBar = () => {

    const users = [
        
            {id:1,firstName:"devanshi",lastName:"Panchal"},
            {id:2,firstName:"hetal",lastName:"Patil"},
            {id:3,firstName:"bans",lastName:"thakkar"}
        
    ]
  return (
    <Box
    backgroundColor="#f7f7f7"
    height="100vh"
    width="250px"
    padding="10px">
        <Stack direction="row"
        justifyContent="space-between">
        <Typography variant="h6">Chat</Typography>
        <LogoutIcon/>
        </Stack>
      
        <Divider />
        {
            users.map(item=>{
                return <UserCard key={item.id} item={item}/>
            })
        }
    </Box>
  )
}

export default SideBar