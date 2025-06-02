import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { MdDarkMode, MdDelete, MdDeleteOutline, MdEdit, MdLightMode, MdOutlineAddToPhotos, MdOutlineAddPhotoAlternate, MdLogout, MdMenuOpen, MdModeEditOutline, MdOutlineAddAPhoto } from "react-icons/md";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Container, Divider, ListItem, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { SideContext } from '../context/SidebarContext';
import { FiEdit } from "react-icons/fi";
import { LogContext } from '../context/LoginContext';
import axios from 'axios';
import { notify } from '../layouts/Notify';
import { useEffect } from 'react';
import { themeContext } from '../context/themContext';
export default function Navbar() {
  const { isDark, toggleTheme } = useContext(themeContext);

  const { open, setOpen, handleSidebar } = useContext(SideContext);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setElevated(true);
      } else {
        setElevated(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    refreshAuth: accessProfile
  } = useContext(LogContext)

  console.log(isAuthenticated,)

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`, {}, { withCredentials: true });
      console.log('logout:', result)
      setIsAuthenticated(false);
      notify('success', `Logout`, 'Successfully Logout!')
      navigate('/')
      return { success: true };

    } catch (error) {
      console.log('Logout error:', error);
      return { success: false };
    }
  };


  return (
    <Box sx={{ height: 70 }}>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor: elevated ? isDark ? '' : '#f5f5f5' : 'transparent',
          // backgroundColor: isDark ? '' : '#f5f5f5',
          boxShadow: elevated ? 2 : 'none',
          transition: 'all 0.3s ease',
          color: elevated ? 'black' : 'black',
          height: 70
        }}
      >
        <Toolbar>
          <IconButton
            className='d-md-none d-block'
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => handleSidebar()}
          >
            <MdMenuOpen />
          </IconButton>

          {!isDark ?
            <Box sx={{ display: 'flex', flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
              <img src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183761/sidebarLogo_ud77u7.png' alt="logo" style={{ height: '50px', width: '200px' }} />

            </Box>
            :
            <Box sx={{ display: 'flex', flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
              <img src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183761/navbarLogo_sl0bux.png' alt="logo" style={{ height: '50px', width: '200px' }} />

            </Box>
          }




          <div className="d-none d-md-block " style={{ width: '30%' }}>
            <ul className=" me-5 custom-list   d-flex justify-content-between  d-flex"
            >
              <li><Link style={{ color: isDark ? 'whitesmoke' : 'black' }} to="/">Home</Link></li>
              <li><Link style={{ color: isDark ? 'whitesmoke' : 'black' }} to="/projects">Projects</Link></li>
              <li><Link style={{ color: isDark ? 'whitesmoke' : 'black' }} to="/about">About</Link></li>
              <li><Link style={{ color: isDark ? 'whitesmoke' : 'black' }} to="/contact">Contact</Link></li>
            </ul>
          </div>
          {!isAuthenticated ? (
            <Button className="d-none d-md-block me-4" variant='outlined' component={Link} to="/login" sx={{ color: isDark ? 'white' : 'black' }}>Login</Button>
          ) : null}
          {!isDark ? <Tooltip className='d-flex' title='Switch dark mode' arrow >
            <Typography sx={{ cursor: 'pointer', color: 'black' }} className='mt-3 d-none d-md-block'
              onClick={() => toggleTheme()} variant='h8'>Light</Typography>
            <IconButton className='text-dark d-none d-md-block ' onClick={() => toggleTheme()}>
              <MdDarkMode />
            </IconButton>
          </Tooltip>
            :
            <Tooltip className='d-flex' title='Switch light mode' arrow>
              <Typography sx={{ cursor: 'pointer', color: 'whitesmoke' }} className='mt-3 d-none d-md-block'
                onClick={() => toggleTheme()} variant='h8'>Dark</Typography>
              <IconButton className='text-light d-none d-md-block' onClick={() => toggleTheme()}>
                <MdLightMode />
              </IconButton>
            </Tooltip>
          }
          {isAuthenticated ? (
            <Avatar className='ms-2 me- bg-whit' sizes='sm' onClick={handleClick} sx={{ cursor: 'pointer' }}>G</Avatar>
          ) : null}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openMenu}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.32))',
                  borderRadius: '10px',
                  padding: '4px',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem className='rounded-3' onClick={handleClose}>
              <Avatar>G</Avatar> Gupreet singh
            </MenuItem>
            <Divider />

            <Link to='/add-project' style={{ textDecoration: 'none', color: isDark ? 'white' : 'black' }}>
              <MenuItem className='rounded-3'>
                <ListItemIcon>
                  <MdOutlineAddPhotoAlternate fontSize={23} />
                </ListItemIcon>
                Add Project
              </MenuItem>
            </Link>
            <Link to='/projects' style={{ textDecoration: 'none', color: isDark ? 'white' : 'black' }}>
              <MenuItem className='rounded-3'>
                <ListItemIcon>
                  <FiEdit fontSize={20} />
                </ListItemIcon>
                Edit Project
              </MenuItem>
            </Link>
            <Link to='/projects' style={{ textDecoration: 'none', color: isDark ? 'white' : 'black' }}>
              <MenuItem className='rounded-3'><ListItemIcon><MdDeleteOutline fontSize={25} /> </ListItemIcon>
                Delete Project
              </MenuItem>
            </Link>

            <Divider />
            <MenuItem onClick={logout} className='rounded-3'>
              <ListItemIcon>
                <MdLogout fontSize={20} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box >
  );
}
