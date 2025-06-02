import React, { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { SideContext } from '../context/SidebarContext';
import { Link, useNavigate } from 'react-router-dom';
import { MdContactPhone, MdDarkMode, MdHome, MdLightMode, MdLogin, MdPerson, MdPhone } from 'react-icons/md';
import { FaBuilding, FaTools } from "react-icons/fa";
import { Button, Card } from '@mui/material';
import { themeContext } from '../context/themContext';
import { PiBuildingsFill } from "react-icons/pi";
import { LogContext } from '../context/LoginContext';
const drawerWidth = '75%';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar() {
  const theme = useTheme();
  const { open, setOpen, handleSidebar } = useContext(SideContext)
  const { isDark, toggleTheme } = useContext(themeContext)
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    refreshAuth: accessProfile
  } = useContext(LogContext)
  const navigate = useNavigate();
  // const handleTheme = () => {
  //     toggleTheme()
  //     handleSidebar()
  // }


  return (
    <div >


      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },

          color: 'rgb(252, 247, 232)',
        }}
        variant='temporary'
        anchor="left"
        open={open}
        onClose={handleSidebar}
        className="d-md-none d-block"


      >
        <DrawerHeader className=' ' sx={{ height: '65px' }}>
          <img className=' me-auto' src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183761/sidebarLogo_ud77u7.png' alt="" style={{ height: '50px', width: '200px' }} />

          <IconButton onClick={handleSidebar}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className='bg-' component="div" disablePadding onClick={handleSidebar}>
          <Link to='/' className='sidebar-links'>
            <ListItemButton className=''>
              <ListItemIcon>
                <IconButton  >
                  <MdHome />
                </IconButton>
                <ListItemText className='mt-2 ms-2' primary='Home' />
              </ListItemIcon>
            </ListItemButton>
          </Link>

          <Link to='/projects' className='sidebar-links' onClick={handleSidebar}>
            <ListItemButton className=''>
              <ListItemIcon>
                <IconButton  >
                  <PiBuildingsFill />
                </IconButton>
                <ListItemText className='mt-2 ms-2' primary='Projects' />
              </ListItemIcon>
            </ListItemButton>
          </Link>

          <Divider />
          <Link to='/about' className='sidebar-links' onClick={handleSidebar}>

            <ListItemButton className='' >
              <ListItemIcon>
                <IconButton  >
                  <MdPerson />
                </IconButton>
                <ListItemText className='mt-2 ms-2' primary='About' />
              </ListItemIcon>
            </ListItemButton>
          </Link>
          <Link to='/contact' className='sidebar-links' onClick={handleSidebar}>
            <ListItemButton className=''>
              <ListItemIcon>
                <IconButton  >
                  <MdPhone />
                </IconButton>
                <ListItemText className='mt-2 ms-2' primary='Contact' />
              </ListItemIcon>
            </ListItemButton>
          </Link>
          {!isDark ? <ListItemButton className='' onClick={toggleTheme}>
            <ListItemIcon>
              <IconButton  >
                <MdDarkMode />
              </IconButton>
              <ListItemText className='mt-2 ms-2' primary='Dark Mode' />
            </ListItemIcon>
          </ListItemButton>
            :
            <ListItemButton className='' onClick={toggleTheme}>
              <ListItemIcon>
                <IconButton  >
                  <MdLightMode />
                </IconButton>
                <ListItemText className='mt-2 ms-2' primary='Light Mode' />
              </ListItemIcon>
            </ListItemButton>}
          <Divider />
          {!isAuthenticated ? <Link to='/login' className='sidebar-links' onClick={handleSidebar}>
            <ListItemButton className='bg-'>
              <ListItemIcon>
                <IconButton  >
                  <MdLogin />
                </IconButton>

                <ListItemText className=' ms-2' primary='Login' />
              </ListItemIcon>
              <p className='ms-auto mt-2 text-'>Admin </p>
            </ListItemButton>

          </Link> : null}
          <Card className='rounded-4 text-center  ' style={{ width: drawerWidth, position: 'fixed', bottom: '0px' }}>
            <h3 className='pt-4 mb-0 pb-0'>Avail Quickly Support</h3><br />
            <p className='m-0 p-0'>We are here to assist for all</p>
            <p className='m-0 pb-3'> your  solutions</p>

            <Button className='mb-3 ProjectButton text-white' onClick={() => navigate('/contact')} variant='contained' >Let's Talk</Button>
          </Card>

        </List>
      </Drawer>

    </div>
  );
}
