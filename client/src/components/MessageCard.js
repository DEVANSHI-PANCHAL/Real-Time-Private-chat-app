import React from 'react'
import { AppBar, Toolbar, Box, Avatar, Typography,TextField } from '@mui/material'

const MessageCard = ({text,date,direction}) => {
  return (
      <Box
      display="flex"
      justifyContent={direction}>
          <Box>
        <Typography
        variant="subtitle2"
        backgroundColor="white"
        padding="5px"
        >
            {text}
        </Typography>
        <Typography
        variant="caption"
        
        padding="5px"
        >
            {new Date (date).toLocaleTimeString()}
        </Typography>
    </Box>
      </Box>
    
  )
}

export default MessageCard