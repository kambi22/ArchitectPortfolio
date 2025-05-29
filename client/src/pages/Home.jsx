import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, Stack, Rating, CircularProgress, Skeleton, } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AOS from 'aos';
import { useEffect, useState, useSyncExternalStore } from "react";
import CountUp from 'react-countup';


import { GiTrophyCup } from "react-icons/gi";
import axios from "axios";

const Home = () => {
  const [projectimages, setProjectimages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.refresh();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, []);

  useEffect(() => {
    const getImages = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/homeprojectimg`)
        console.log('resule', result.data)
        const allImages = result.data.flatMap(item => item.images)

        console.log("result imges", allImages)
        setProjectimages(allImages)
      } catch (error) {
        console.log('error to project images', error)
      }
    }
    getImages()
  }, []);

  return (
    <Box>
      <div className="home-banner">
        <img src='https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FhomeBanner.jpg?alt=media&token=1e1864af-e165-4f6d-9613-19dee5955703' alt="Home banner" />
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
          <Grid sx={{ marginTop: '60px' }} size={{ xs: 12, sm: 6, md: 4, xl: 4 }}>
            <Stack spacing={1} >
              <Rating className="mx-auto" name="half-rating" defaultValue={4.5} precision={0.5} />
              <Typography variant="h6">4.5 Ratings</Typography>
            </Stack>
          </Grid>
          <Grid className='bg- ' sx={{ marginTop: '60px' }} size={{ xs: 12, sm: 6, md: 4, xl: 4 }}>


            <div className="d-flex justify-content-center">
              <i><GiTrophyCup fontSize={50} className="text-warning" /></i>
              <Typography variant="h3" sx={{ fontWeight: 'bold', }}>
                <CountUp end={100} duration={8} ></CountUp>
              </Typography>
            </div>




            <Typography variant="h5">Completed Projects</Typography>

          </Grid>
          <Grid sx={{ marginTop: '20px' }} size={{ xs: 12, sm: 6, md: 4, xl: 4 }}>
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
            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2Fbuilding%20planer.jpg?alt=media&token=f5f9fbf7-bc52-46f4-93ea-09975714909e' alt="Building Planer" />
                <Typography className="services-text shadow" variant="h5">Building Planer</Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FInterior.jpg?alt=media&token=7b281280-f3d6-4b99-b7e7-c2bc3c8e52fc' alt="interior" />
                <Typography className="services-text shadow" variant="h5">Interior & Exterior</Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto " style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FEstimator.jpg?alt=media&token=e74dad88-3780-41eb-ba5c-c230f3537094' alt="Estimator" />
                <Typography className="services-text shadow" variant="h5">Design Estimator</Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FEmbassy.jpg?alt=media&token=eab5ca99-91c4-49e5-8b5d-993ef8dbc5e2' alt="Embassy" />
                <Typography className="services-text shadow" variant="h5">Embassy Purpose</Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2Fvaluation.jpg?alt=media&token=5556979e-0a6d-488a-9c4f-fb053b884b7e' alt="valuation" />
                <Typography className="services-text shadow" variant="h5">Valuation</Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FNoc%20files.jpg?alt=media&token=e3ee99d7-8154-431b-8ec0-5c6f76b7ecd4' alt="NOC File" />
                <Typography className="services-text shadow" variant="h5">NOC Files</Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2Fvisualisation.jpg?alt=media&token=fa33a83a-7c6f-42e1-9cd8-384a01875b32' alt="Visualisation" />
                <Typography className="services-text shadow" variant="h5">Visualisation</Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FstructureDesigner.jpg?alt=media&token=ed093a8d-2c00-477f-b817-bd650a0ebe01' alt="Structure Design" />
                <Typography className="services-text shadow" variant="h5">Structure Design</Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
              <Card data-aos="zoom-in" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                <img className="w-100 h-100" src='https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FApproved.jpg?alt=media&token=48287a26-e81c-413e-b8cb-7237cc0e911e' alt="MC Approvel" />
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


              {projectimages.length > 0 ? (
                projectimages.map((img, i) =>
                  <Grid key={i} item size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
                    <Link to='/projects'>
                      <Card data-aos="zoom-out" className="shadow rounded-3 mx-auto" style={{ height: '200px', width: '300px', position: 'relative', cursor: 'pointer' }}>
                        <img className="w-100 h-100" src={img.url} alt="" />
                        <Typography className="services-text shadow" variant="h5">{img.label}</Typography>
                      </Card>
                    </Link>
                  </Grid>

                )
              ) : (
                <>
                  <Grid className='w-100' container spacing={3} >
                    <Grid className='bg- '  size={{ xs: 12, sm: 6, md: 4, xl: 4 }}  >
                       <Skeleton animation='wave' className='rounded-4 w-100' variant="rounded" height={220} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
                       <Skeleton animation='wave'  className='rounded-4 w-100' variant="rounded" height={220} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
                       <Skeleton animation='wave'  className='rounded-4 w-100' variant="rounded" height={220} />
                    </Grid>
                  </Grid>

                </>)}


            </Grid>

            <Button variant="contained" sx={{ marginTop: '70px' }} className="rounded-3 " size="large" onClick={() => navigate('/projects')}>Veiw All Projects</Button>


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

