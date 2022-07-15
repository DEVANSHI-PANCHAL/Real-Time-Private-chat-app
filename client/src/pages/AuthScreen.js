import React,{useState,useRef} from 'react'
import {Box,Stack,Typography,Button,TextField,Card} from '@mui/material'
const AuthScreen = () => {
    const [showlogin,setShowLogin] = useState(true)
    const [formData,setFormData] = useState({})
    const authForm = useRef(null)
    const handleChange = (e)=>{
     
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(formData)
    }
  return (
    <Box 
    ref={authForm}
    component="form"
    onSubmit={handleSubmit}
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="80vh"
    >
        <Card
        variant="outlined"
        sx={{padding:"10px"}}>
        <Stack
        direction="column"
        spacing={2}
        sx={{width:"400px"}}>
            <Typography variant="h5" textAlign="center">{showlogin?"Login":"Signup"}</Typography>
            {
                !showlogin &&
                <>
                {/* <TextField
                name="firstName"
                label="First Name"
                variant="standard"
                onChange={handleChange}
                />
                <TextField
                name="lastName"
                label="Last Name"
                variant="standard"
                onChange={handleChange}
                /> */}
                <TextField
                name="firstName"
                label="firstName"
                type="text"
                variant="standard"
                onChange={handleChange}
                />
                <TextField
                name="lastName"
                label="lastName"
                type="text"
                variant="standard"
                onChange={handleChange}
                />
                
                </>
            }
              <TextField
                name="email"
                label="email"
                type="email"
                variant="standard"
                onChange={handleChange}
                />
                <TextField
                name="password"
                label="password"
                type="password"
                variant="standard"
                onChange={handleChange}
                />
                <Typography textAlign="center" variant="subtitle1" onClick={()=>{
                    setShowLogin((preValue)=>!preValue)
                    setFormData({})
                    authForm.current.reset()
                }}>{showlogin? "Don't have any account yet? Signup here":"Already have an account? Login here"}</Typography>
            <Button variant="outlined" type="submit">{showlogin?"Login":"Signup"}</Button>
        </Stack>
        </Card> 
    </Box>
  )
}

export default AuthScreen