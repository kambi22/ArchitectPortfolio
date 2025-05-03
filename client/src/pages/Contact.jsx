
import { Box, Button, Container, Grid, TextField, Typography, Snackbar, Card, CardContent, } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom'
import { themeContext } from '../context/themContext';
import { toast } from "../layouts/Notify";
const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [open, setOpen] = useState(false);
  const {isDark} = useContext(themeContext)
  const formRef = useRef(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
  console.log("ids:",import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  )
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call backend API to send email/store message
    console.log("formate data", formData.name, formData.email, formData.subject, formData.message)
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log('Email successfully sent!', result.text);
      toast('success','Email Successfully Sent!','top-right',true)
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      toast('error','Failed to send messag, Please try again later','top-right',true)
    });

    e.target.reset(); // Reset form
  
    
  };

  const openWhatsapp = () => {
    console.log('whatsapp opned')
  }

  return (
    <div className="">
      <Container className="bg- mt-5">
        <div className="d-flex bg- h-50"   >


          <img src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183762/removebg_full_logo_vkqezy.png' className="full-logo-image" alt="logo" />


          <img src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183633/contactimg_qca4ke.png' alt="contact" className="contact-image" />

        </div>
      </Container>
      <Container className="bg- mt-5" >
        <Grid container spacing={1}>

          <Grid className='bg- text-center' size={{ xs: 6, sm: 6, md: 3, xl: 3 }}>
            <a href="tel:+919779270719" style={{ textDecoration: 'none',color:!isDark? 'black':'white'  }}>
              <DotLottieReact className="  mx-auto"
                src="https://lottie.host/67aad02a-06a2-4d0b-b654-3c39cccfe917/Iv7vZBn47D.lottie"
                loop
                autoplay
                style={{ cursor: 'pointer' }}
                onClick={openWhatsapp}
              />
              <Typography variant="h6">Phone</Typography>
            </a>
          </Grid>
          <Grid className='bg- text-center' size={{ xs: 6, sm: 6, md: 3, xl: 3 }}>
            <a href="https://wa.me/919779270719 " style={{ textDecoration: 'none',color:!isDark? 'black':'white'  }}>
              <DotLottieReact className="  mx-auto"
                src="https://lottie.host/68f8d45f-55a5-4054-9d9b-9dc91c6589c9/przKf78WeU.lottie"
                loop
                autoplay
                style={{ cursor: 'pointer' }}
                onClick={openWhatsapp}
              />
              <Typography className="text-center" variant="h6">Whatsapp</Typography></a>
          </Grid>
          <Grid className='bg-' size={{ xs: 6, sm: 6, md: 3, xl: 3 }}>
            <Link to='https://www.instagram.com/its_bambrah/' style={{ textDecoration: 'none',color:!isDark? 'black':'white',  }}>
              <DotLottieReact className=" mx-auto"
                src="https://lottie.host/9eba41c5-34ce-4ff0-8ca2-3c5e084c4a17/sGhZ6c787f.lottie"
                loop
                autoplay

                onClick={openWhatsapp}
              />
              <Typography variant="h6">Instagram</Typography>
            </Link>
          </Grid>
          <Grid className='bg-' size={{ xs: 6, sm: 6, md: 3, xl: 3 }}>
            <Link to='https://www.facebook.com/profile.php?id=100065268842060' style={{ textDecoration: 'none',color:!isDark? 'black':'white'  }}>
              <DotLottieReact className="mx-auto mb-0 pb-0"
                src="https://lottie.host/af7738eb-6c90-4d61-9923-909c0e2f9502/HFm57ZRDl4.lottie"
                loop
                autoplay
                style={{ cursor: 'pointer' }}
                onClick={openWhatsapp}
              />
              </Link>
              <Typography className="mt-0 pt-0" variant="h6">Facebook</Typography>
            
          </Grid>

        </Grid>
      </Container>
      <div className="w-100 ">
        <Container className="mt-5 email-main bg- text-end " maxWidth='md' sx={{ py: 20 }}>
          <div className="email-image text-end bg-">
            <img className="w-100 h-100 " src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183637/sendEmail_x3sjoi.png' alt="email" />
          </div>
          <Card className=" p-xl-3 mt-5 form" sx={{ borderTopRightRadius: '40px', borderBottomLeftRadius: '40px' }}  >
            <CardContent className="pt- ">
            <Typography className="text-start" variant="h4">Email</Typography>
              <Box ref={formRef} component="form" onSubmit={handleSubmit} sx={{ display: "flex", paddingTop: '45px', flexDirection: "column", gap: 2 }}> {/* Adjust gap value as needed */}
             
                <TextField
                  name="name" // ✅ required
                  className="col-xl-7"
                  type="text"
                  label="Enter Name"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                 
                />

                <TextField
                  name="email" // ✅
                  className="col-xl-8"
                  type="email"
                  label="Enter Email"
                  placeholder="Enter your email address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                 
                />

                <TextField
                  name="subject" // ✅
                  className="w-100"
                  type="text"
                  label="Enter Subject"
                  placeholder="Enter your subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />

                <TextField
                  name="message" // ✅
                  type="text"
                  label="Enter Message"
                  placeholder="Enter message"
                  className="w-100"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
                <div className="">
                <Button className="mt-5  text-end" type="submit" variant="contained">Send Email</Button>


                </div>
              </Box>
            </CardContent>
          </Card>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            message="Message sent successfully!"
            onClose={() => setOpen(false)}
          />
        </Container>
      </div>

    </div>
  );
};

export default Contact;
