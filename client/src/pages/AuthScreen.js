import React,{useState,useRef} from 'react'
import {Box,Stack,Typography,Button,TextField,Card,CircularProgress,Alert} from '@mui/material'
import {useMutation} from '@apollo/client'
import {SIGNUP_USER,LOGIN_USER} from '../graphql/mutations';
import { isOptionGroup } from '@mui/base';

const AuthScreen = ({setloggedIn}) => {
    const [showlogin,setShowLogin] = useState(true)
    const [formData,setFormData] = useState({})
    const authForm = useRef(null)
    const [signupUser,{data:signupData,loading:l1,error:e1}] = useMutation(SIGNUP_USER)
    const [loginUser,{data:loginData,loading:l2,error:e2}] = useMutation(LOGIN_USER,{
        onCompleted(data){
            localStorage.setItem("jwt",data.signinUser.token)
            setloggedIn(true)
        }
    })
  
    if(l1 || l2){
        return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh">
        <Box
        textAlign="center">
            <CircularProgress />
            <Typography variant="h6">authenticating...</Typography>
        </Box>
        </Box>)
    }

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(showlogin){
           loginUser({
               variables:{
                   userNew:formData
               }
           })
        }else{
            signupUser({
                variables:{
                    userNew:formData
                }
            })
        }
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
            {signupData && <Alert severity="success">{signupData.signupUser.firstName} signed up</Alert>}
            {e1 && <Alert severity="error">{e1.message}</Alert>}
            {e2 && <Alert severity="error">{e2.message}</Alert>}
            <Typography variant="h5" textAlign="center">{showlogin?"Login":"Signup"}</Typography>
            {
                !showlogin &&
                <>
               
                <TextField
                name="firstName"
                label="firstName"
                type="text"
                variant="standard"
                onChange={handleChange}
                required
                />
                <TextField
                name="lastName"
                label="lastName"
                type="text"
                variant="standard"
                onChange={handleChange}
                required
                />
                
                </>
            }
              <TextField
                name="email"
                label="email"
                type="email"
                variant="standard"
                onChange={handleChange}
                required
                />
                <TextField
                name="password"
                label="password"
                type="password"
                variant="standard"
                onChange={handleChange}
                required
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