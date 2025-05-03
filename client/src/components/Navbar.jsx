import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { MdDarkMode, MdDelete, MdDeleteOutline, MdEdit, MdLightMode,MdOutlineAddToPhotos,MdOutlineAddPhotoAlternate , MdLogout, MdMenuOpen, MdModeEditOutline, MdOutlineAddAPhoto } from "react-icons/md";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Container, Divider, ListItem, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { SideContext } from '../context/SidebarContext';
import { themeContext } from '../context/themContext';
import { FiEdit } from "react-icons/fi";
import { LogContext } from '../context/LoginContext';
import axios from 'axios';
import { notify } from '../layouts/Notify';
export default function Navbar() {
    const { open, setOpen, handleSidebar } = useContext(SideContext);
     const {
        isAuthenticated,
        setIsAuthenticated,
        loading,
        refreshAuth: accessProfile
      } = useContext(LogContext)
    const { isDark, toggleTheme } = useContext(themeContext);
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
          const result = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
          console.log('logout:',result)
          setIsAuthenticated(false);
          notify('success',`Logout`,'Successfully Logout!')
          navigate('/')
          return { success: true };
    
        } catch (error) {
          console.log('Logout error:', error);
          return { success: false };
        }
      };

  
    return (
        <Box >
            <AppBar
                position="static"
                sx={{
                    backgroundColor: isDark ? 'default' : '#5ba5f5',
                    color: isDark ? 'inherit' : 'rgb(252, 247, 232)',
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

                    <Box sx={{ display: 'flex', flexGrow: 1, cursor:'pointer' }} onClick={()=>navigate('/')}>
                        <img src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183761/navbarLogo_sl0bux.png' alt="logo" style={{ height: '50px', width: '200px' }} />
                        
                    </Box>

                    <div className="d-none d-md-block " style={{ width: '30%' }}>
                        <ul className="custom-list me-5  d-flex justify-content-between  d-flex">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    {!isAuthenticated?(
                    <Button className="d-none d-md-block me-4" variant='outlined' component={Link} to="/login" color="inherit">Login</Button>
                    ):null }
                    {!isDark ? <Tooltip className='d-flex' title='Switch dark mode' arrow >
                        <Typography sx={{cursor:'pointer'}} className='mt-3 d-none d-md-block' 
                        onClick={() => toggleTheme()} variant='h8'>Light</Typography>
                        <IconButton className='text-light d-none d-md-block ' onClick={() => toggleTheme()}>
                            <MdDarkMode />
                        </IconButton>
                    </Tooltip>
                        :
                        <Tooltip className='d-flex' title='Switch light mode' arrow>
                             <Typography sx={{cursor:'pointer'}} className='mt-3 d-none d-md-block' 
                             onClick={() => toggleTheme()} variant='h8'>Dark</Typography>
                            <IconButton className='text-light d-none d-md-block' onClick={() => toggleTheme()}>
                                <MdLightMode />
                            </IconButton>
                        </Tooltip>
                    }
                    {isAuthenticated?(
                   <Avatar className='ms-2 me- bg-whit' sizes='sm' onClick={handleClick} sx={{cursor:'pointer'}}>G</Avatar>
                    ):null }
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
              borderRadius: '5px',
              padding:'8px',
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
        
        <Link to='/add-project' style={{textDecoration:'none',color:isDark?'white':'black'}}>
        <MenuItem className='rounded-3'>
        <ListItemIcon>
            <MdOutlineAddPhotoAlternate fontSize={23}/>
        </ListItemIcon>
        Add Project
        </MenuItem>
        </Link>
        <Link to='/projects' style={{textDecoration:'none',color:isDark?'white':'black'}}>
        <MenuItem className='rounded-3'>
        <ListItemIcon>
            <FiEdit fontSize={20}/>
        </ListItemIcon>
        Edit Project
        </MenuItem>
        </Link>
        <Link to='/projects' style={{textDecoration:'none',color:isDark?'white':'black'}}>
        <MenuItem className='rounded-3'><ListItemIcon><MdDeleteOutline fontSize={25}/> </ListItemIcon>
         Delete Project
        </MenuItem>
        </Link>
        
        <Divider/>
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
