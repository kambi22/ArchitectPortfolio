import { Box, Button, Fab, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useContext, useState } from "react"
// import {  Visibility,VisibilityOff } from "@mui/icons-material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Player } from "@lottiefiles/react-lottie-player";
import { themeContext } from "../context/themContext";
import { notify } from "../layouts/Notify";
import { useNavigate } from "react-router";
import { toast } from "../layouts/Notify";
import axios from 'axios'
import { LogContext } from "../context/LoginContext";
const Login = (props) => {
  const { isDark, toggleTheme } = useContext(themeContext);
  const [user, setUser] = useState({ email: '', password: '' });
  const [showpassword, setShowpassword] = useState(false);
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    refreshAuth: accessProfile
  } = useContext(LogContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })

  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
          // const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, user, {
          const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, user, {
            withCredentials: true
          });
          console.log('login:',response)
          if (response.data.authenticated) {
            setIsAuthenticated(true);
           
            notify('success',`Hi ${response.data.user.name}`,'Successfully login!')
            navigate("/")
            return { success: true, };
          }
        } catch (error) {
          setIsAuthenticated(false);
          console.log('error:',error);
          toast('error',`${error.response.data.error}`,'top-right',true)
        }
  
  }


  return (
    <div className='justify-content-center pt-5 d-flex ' style={{ position: 'relative' }} >

      {loading ? <h5>Loading...</h5> : null}
      <Box component='form' onSubmit={handleLogin} className="GlassEffect ms-2 me-2 pt-5  rounded-5 p-3 ">  {/*go to css file using crt+click on class name; */}
        <h5 className={isDark ? 'text-light ' : 'text-dark t'}>Admin Login</h5>

        <Player className="" src='https://lottie.host/28489f37-c5b8-4d46-99ec-28f5482d24fa/LcLSzjK909.json' loop autoplay style={{ height: '200px', width: '200px' }} />
        <TextField name="email" value={user.email} onChange={handleChange} className="w-100" type='email' label='Email' placeholder="Enter User Email" id="email" autoComplete="email" autoCorrect="email" required />
        <TextField name="password" value={user.password} onChange={handleChange} className="w-100 mt-3" type={showpassword ? "text" : "password"} label='Password'
          placeholder="Enter User Pssword" id="password" autoComplete="password" autoCorrect="password" required InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton className={showpassword ? 'd-inline' : 'd-none'} onClick={() => setShowpassword(false)}>
                  <MdVisibility />
                </IconButton>
                <IconButton className={!showpassword ? 'd-inline' : 'd-none'} onClick={() => setShowpassword(true)}>
                  <MdVisibilityOff />
                </IconButton>
              </InputAdornment>
            )
          }} />


        <Button type='submit' className="mt-5 w-100 mb-5 bg-  rounded-3 ProjectButton text-white" style={{ height: '40px' }} variant='contained' size="large" >Login</Button>
      </Box>
   


    </div>
  )
};

export default Login;
