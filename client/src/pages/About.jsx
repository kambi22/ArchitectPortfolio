import { FaGraduationCap } from "react-icons/fa6";
import { Box, Chip, Container, Divider, Grid } from "@mui/material";
import React from "react"
import { GiStamper } from "react-icons/gi";

const About = (props) => {
  return (
    <div className="bg-">
      <Container className="mt-5 bg- " fixed>
      <div className="GlassEffectFordiv  rounded-5   about-image">
          <img className="w-100 h-100 rounded-5"  src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183021/Profile_npxxrn.jpg' alt="photo" />
        </div>
        <div className="GlassEffectFordiv  rounded-5 shadow summary-card">
        
         <div className="col-xl-9 bg- ms-auto p-xl-5 p-3 text-start">
          <h3 className=" text-" style={{fontWeight:'bold'}}>Gurpreet Singh Architect</h3>
         <p className="">With over 5 years of professional experience in the field of architecture, I am a licensed architect dedicated to delivering innovative and practical design solutions. My expertise spans across a wide range of services including building planning, interior and exterior design, structural design, and 3D visualization.
            I also specialize in design estimation, embassy purpose documentation, property valuation, NOC files, MC-approved files, and regulatory compliance for both residential and commercial projects.
            My mission is to craft spaces that are not only aesthetically appealing but also structurally sound, sustainable, and client-focused. Whether you're looking to bring a concept to life or navigate official approvals, I provide end-to-end support to turn your vision into reality.
            </p>
         </div>
        </div>
        <Box my={5}>
        <Divider className="">
          <Chip className="shadow" label="My Experience" color="" />
        </Divider>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{xl:6, md: 6, sm: 12, xs: 12}}>
        <div className="GlassEffectFordiv p-3 rounded-5 shadow text-start">
        <h5 style={{fontWeight:'bold'}}><FaGraduationCap size={30} /> Education</h5>
        <p>BTech(Bachelor Of Technology) Civil, From Baba Ishar Singh(BIS) Collage Gagrah(Moga)</p>
       
      </div>
        </Grid>
        <Grid size={{xl:6, md: 6, sm: 12, xs: 12}}>
        <div className="GlassEffectFordiv p-3 rounded-5 shadow text-start">
        <h5 style={{fontWeight:'bold'}}><GiStamper size={30} /> Licence</h5>
        
        <p>Approved From Government Of India</p>
      </div>
        </Grid>
      </Grid>
    
      
      
 
      </Container>

    </div>
  )
};

export default About;
