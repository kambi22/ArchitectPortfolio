// Footer.js
import React, { useContext } from 'react';
import { Box, Typography, Container, Grid, IconButton, AppBar, Divider } from '@mui/material';
import { FaLinkedin, FaInstagram ,FaFacebook ,FaYoutube, FaPhone, FaWhatsapp } from "react-icons/fa";
import { themeContext } from '../context/themContext';



const Footer = () => {
  const {isDark} = useContext(themeContext)
  console.log("isdark",isDark)
  return (
    <div className=''>
      <div className="w-100 bg- text-start">
      <img className='footer-image' src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183634/footer-illustration_xeedjj.png' alt="footerimage" />

      </div>
<Container  className='Footer   pt-4 pb-3' maxWidth='xl'
    sx={{
      backgroundColor: isDark ? 'default' : '#f5f5f5',
      color: isDark ? 'inherit' : 'black',
     boxShadow: 5
  }} >
      <Grid container spacing={2}>
        <Grid className='bg-' size={{ xs: 12, sm: 12, md: 4, xl: 4 }}>
          {isDark? 
          <img className='mb-0 pb-0' src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183763/gopy_logo_white_sjspje.png' alt="logo" style={{height:'180px', width:'300px'}} />
          :
          <img className='mb-0 pb-0' src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183762/removebg_full_logo_vkqezy.png' alt="logo" style={{height:'180px', width:'300px'}} />
          }
        <h5 className='mt-0 pt-0'><strong>Bambrah Creation</strong></h5>
        <Typography variant='h6'>Follow Us</Typography>
        <div className="d-flex justify-content-center iconColore">
        <a className='' href="tel:+919779270719" >
            <IconButton className='' size='large'  >
              <FaPhone />
            </IconButton>
          </a>
        <a className='' href="https://wa.me/919779270719 " >
            <IconButton className='' size='large'  >
              <FaWhatsapp />
            </IconButton>
          </a>
          <a href='https://www.facebook.com/profile.php?id=100065268842060' >
            <IconButton size='large' className='' >
              <FaInstagram />
            </IconButton>
          </a>
          <a href='https://www.facebook.com/profile.php?id=100065268842060'>
            <IconButton size='large' className='' >
              <FaFacebook />
            </IconButton>
          </a>
          
        </div>
        
        </Grid>
        <Divider className=' bg-white' orientation="vertical" flexItem />
        <Grid className='text-start ' size={{ xs: 12, sm: 12, md: 4, xl: 4 }}>
       
          <h5><strong>Contact</strong></h5>
          <p className="">Name: Gurpreet Singh</p>
          <p>Phone: +91 97792-70719</p>
          <p>Gmail: gurpreetkot8@gmail.com</p>
          <p>Address: Moga, Punjab (India)</p>
        </Grid>
        <Divider className=' bg-white' orientation="vertical" flexItem />

        <Grid className='text-start' size={{ xs: 12, sm: 12, md: 3, xl:3 }}>
          <h5><strong>About</strong></h5>
          <p >Name: Gurpreet Singh</p>
          <p>Education: bachelor of technology(BTech)</p>
          <p>Collage: Baba Ishar Singh(BIS) Collage,Gagrah(Moga)</p>
          <p>University: MRSPTU (Bathinda)</p>
        </Grid>
       
      </Grid>
      <p>© 2025 All rights reserved.</p>
    </Container>
    </div>
    
  );
};

export default Footer;
