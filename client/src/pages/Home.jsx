import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, Stack, Rating, } from "@mui/material";
import { Link } from "react-router-dom";
import AOS from 'aos';
import { useEffect } from "react";
import CountUp from 'react-countup';


import { GiTrophyCup } from "react-icons/gi";

const Home = () => {

  useEffect(() => {
    AOS.refresh();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, []);

  return (
    <Box>
      <div className="home-banner">
        <img src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746180849/homeBanner_jri2ll.jpg' alt="wave" />
        <div className="banner-text w-100">
          <Container>

            <Typography
              data-aos="fade-down"
              className="shadow"
              variant="h2"
              sx={{
                fontSize: {
                  xs: '1.8rem', // mobile
                  sm: '2.5rem', // small screens
                  md: '3.5rem', // medium and up
                },
              }}
            >
              Dream Into Reality
            </Typography>

            <Typography
              data-aos="fade-right"
              className="shadow"
              variant="h3"
              sx={{
                fontSize: {
                  xs: '1.2rem',
                  sm: '2rem',
                  md: '2.8rem',
                },
              }}
            >
              Let's Build Your Dream Home, with Bambrah Creation
            </Typography><br />
          </Container>
        </div>
      </div>

      <div className="">
        <Grid container spacing={3} direction="row"
          sx={{
            justifyContent: "center",

          }}>
          <Grid sx={{ marginTop: '60px' }}  size={{ xs: 12, sm: 6, md: 4, xl: 4 }}>
            <Stack spacing={1} >
              <Rating className="mx-auto" name="half-rating" defaultValue={4.5} precision={0.5} />
              <Typography variant="h6">4.5 Rating</Typography>
            </Stack>
          </Grid>
          <Grid className='bg- ' sx={{ marginTop: '60px' }}  size={{ xs: 12, sm: 6, md: 4, xl: 4 }}>
            
            
            <div className="d-flex justify-content-center">
              <i><GiTrophyCup fontSize={50} className="text-warning"/></i>
              <Typography variant="h3" sx={{ fontWeight: 'bold',  }}>
              <CountUp end={100} duration={8} ></CountUp>
              </Typography>
            </div>
            
            
              
            
            <Typography variant="h5">Completed Projects</Typography>

          </Grid>
          <Grid sx={{ marginTop: '20px' }}  size={{ xs: 12, sm: 6, md: 4, xl: 4 }}>
            <img src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183762/removebg_full_logo_vkqezy.png' alt="logo" style={{ height: '200px', width: '300px' }} />
          </Grid>
        </Grid>
      </div>

      <div className="custom-shape-div">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>

      </div>
      <div className="bg-white services-div"  >
        <Container>
          <Typography className="text-start " variant="h4">Services</Typography>

          <Grid container spacing={3} sx={{ paddingTop: '50px', backgroundColor: 'white' }}>
            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746181053/BuildingPlanner_cmlofs.jpg' alt="" />
                <Typography className="services-text shadow" variant="h5">Building Planer</Typography>
              </Card>
            </Grid>
            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746180880/Interior_ls0maw.jpg' alt="" />
                <Typography className="services-text shadow" variant="h5">Interior & Exterior</Typography>
              </Card>
            </Grid>
            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto " style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746182297/Estimator_ulzaiq.jpg' alt="" />
                <Typography className="services-text shadow" variant="h5">Design Estimator</Typography>
              </Card>
            </Grid>

            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746182297/Embassy_ylelsq.jpg' alt="" />
                <Typography className="services-text shadow" variant="h5">Embassy Purpose</Typography>
              </Card>
            </Grid>
            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746180859/valuation_fxzoei.jpg' alt="" />
                <Typography className="services-text shadow" variant="h5">Valuation</Typography>
              </Card>
            </Grid>
            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746182297/Noc_files_i6jtw1.jpg'alt="" />
                <Typography className="services-text shadow" variant="h5">NOC Files</Typography>
              </Card>
            </Grid>

            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746182297/visualisation_ureh7y.jpg' alt="" />
                <Typography className="services-text shadow" variant="h5">Visualisation</Typography>
              </Card>
            </Grid>
            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746180867/structureDesigner_nmq7ye.jpg' alt="" />
                <Typography className="services-text shadow" variant="h5">Structure Design</Typography>
              </Card>
            </Grid>
            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746180896/approved_f7vm3g.jpg' alt="" />
                <Typography className="services-text shadow" variant="h5">MC Approved</Typography>
              </Card>
            </Grid>

          </Grid>

        </Container>

      </div>
      <div className="project-curve-top ">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
        <div className="bg- " style={{ paddingBottom: '100px' }} >
          <Container>
            <Typography className="text-start fw-bold-" sx={{ marginTop: '50px' }} variant="h4">Projects</Typography>

            <Grid container spacing={3} sx={{ paddingTop: '50px', }}>
            <Grid item size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
            <Link to='/projects'>
                <Card data-aos="zoom-out" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                  <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746269498/2_aiexdw.jpg' alt="" />
                  <Typography className="services-text shadow" variant="h5">Home Moga</Typography>
                </Card>
                </Link>
              </Grid>
         
          
            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
            <Link to='/projects'>
                <Card data-aos="zoom-out" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                  <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746269505/IMG_20201015_195715_q3m8mc.jpg' alt="" />
                  <Typography className="services-text shadow" variant="h5">Gurudwara Raniya</Typography>
                </Card>
                </Link>
              </Grid>
            
         
            <Grid  size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
            <Link to='/projects'>
                <Card data-aos="zoom-out" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                  <img className="w-100 h-100" src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746269504/Q_Photo_-_4_idywzb.jpg' alt="srover" />
                  <Typography className="services-text shadow" variant="h5">Srover Raniya</Typography>
                </Card>
                </Link>
              </Grid>
            </Grid>
            <Link to='/projects'>
              <Button size="large"  className="m-5 Project-buttom rounded-3 shadow" variant="contained">View All Projects</Button>
            </Link>

          </Container>

        </div>
      </div>
      {/* <Container maxWidth="xl " sx={{ marginBottom: '200px' }}>
        <Typography variant="h4" className="text-start" >Visualisation</Typography>
        <Grid container spacing={3} sx={{ marginTop: '50px' }} >
          <Grid  size={{ xs: 12, sm: 12, md: 6, xl: 6 }} >
            <div data-aos="fade-right" className="player-wrapper rounded-4">
              <ReactPlayer

                url={palaceVideo} // or a local file
                width="100%"
                height="100%"
                controls={true}
                playing={true} // Auto-play (if allowed)
                muted={false}
                light={false} // Show thumbnail before play
                loop
              />
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, xl: 6 }} >
            <div data-aos="fade-left" className="player-wrapper">
              <ReactPlayer
                url={second} // or a local file
                width="100%"
                height="100%"
                controls={true}
                playing={true} // Auto-play (if allowed)
                muted={false}
                light={false} // Show thumbnail before play
                loop
              />
            </div>
          </Grid>
        </Grid>

      </Container> */}
    </Box>
  );
};

export default Home;

