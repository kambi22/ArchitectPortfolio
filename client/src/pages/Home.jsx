import { Box, Button, Container, Grid, Typography, Card, CardContent, CardMedia, Stack, Rating, CircularProgress, Skeleton, } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AOS from 'aos';
import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import CountUp from 'react-countup';
import { Player } from "@lottiefiles/react-lottie-player";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";
import { GiTrophyCup } from "react-icons/gi";
import axios from "axios";
import { ThemeContext } from "@emotion/react";
import { themeContext } from "../context/themContext";
import { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';





const services = [
  {
    label: 'Building Planner', description: 'We provide expert planning for residential, commercial, and institutional buildings, ensuring optimal space utilization and compliance with regulations. From concept to blueprint, we turn your vision into a structured plan.',
    img: 'https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2Fbuilding%20planer.jpg?alt=media&token=f5f9fbf7-bc52-46f4-93ea-09975714909e'
  },

  {
    label: 'Interior & Exterior', description: 'Transform your space inside and out with stunning, functional designs tailored to your lifestyle or brand. Our creative team blends aesthetics with practicality for beautiful, livable environments.',
    img: 'https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FInterior.jpg?alt=media&token=7b281280-f3d6-4b99-b7e7-c2bc3c8e52fc'
  },
  {
    label: 'Estimator', description: 'Get precise design-based cost estimates for your construction project. We help you stay within budget without compromising quality or style.',
    img: 'https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FEstimator.jpg?alt=media&token=e74dad88-3780-41eb-ba5c-c230f3537094'
  },

  {
    label: 'Embassy Purpose', description: 'Specialized architectural documentation and plans tailored to meet embassy project requirements. We ensure compliance with all international and security standards.',
    img: 'https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FEmbassy.jpg?alt=media&token=eab5ca99-91c4-49e5-8b5d-993ef8dbc5e2'
  },
  {
    label: 'structure Design', description: 'Robust and reliable structural design for safe and sustainable buildings. Our engineers ensure your structure stands strong for generations.',
    img: 'https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FstructureDesigner.jpg?alt=media&token=ed093a8d-2c00-477f-b817-bd650a0ebe01'
  },
  {
    label: 'Valuation', description: 'Accurate property and construction valuations for loans, sales, or legal purposes. Certified valuation reports based on current market standards and project specifications.',
    img: 'https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2Fvaluation.jpg?alt=media&token=5556979e-0a6d-488a-9c4f-fb053b884b7e'
  },
  {
    label: '3D Visualisation', description: 'Experience your project before its built with lifelike 3D renders and walkthroughs. Visualize layouts, textures, and lighting in stunning detail.',
    img: 'https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2Fvisualisation.jpg?alt=media&token=fa33a83a-7c6f-42e1-9cd8-384a01875b32'
  },
  {
    label: 'NOC Files', description: 'Preparation and submission of NOC (No Objection Certificate) files for hassle-free approvals. We handle the formalities so your project doesnt face delays.',
    img: 'https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FNoc%20files.jpg?alt=media&token=e3ee99d7-8154-431b-8ec0-5c6f76b7ecd4'
  },
  {
    label: 'MC Approved', description: 'We prepare Municipal Committee-approved drawings and files to meet all local authority regulations. Fast-track your building approvals with compliant documentation.',
    img: 'https://firebasestorage.googleapis.com/v0/b/trusty-sentinel-397012.appspot.com/o/Bambrah%20Creation%2FApproved.jpg?alt=media&token=48287a26-e81c-413e-b8cb-7237cc0e911e'
  },


]


const Home = () => {
  const { isDark, toggleTheme } = useContext(themeContext);
  const [projectimages, setProjectimages] = useState([]);

  const navigate = useNavigate();
  const wordRef = useRef();
  const characterRef = useRef();
  const lineRef = useRef();
const [isFlipped, setIsFlipped] = useState(Array(services.length).fill(false));
  
const handleCardFlip = (index) => {
  const allFlipped = isFlipped.every(state => state === true);
    if (allFlipped) return; // Stop if all are flipped

  setIsFlipped(prevState => {
    const newState = [...prevState]; // Create a copy
    newState[index] = !newState[index]; // Update specific index
    return newState;
  });

  console.log('card clicked.', index, isFlipped[index]);
};
console.log('out side array',isFlipped)


  useEffect(() => {
    gsap.registerPlugin(SplitText);

    // Create a master timeline
    const tl = gsap.timeline();

    // Word animation (first)
    const wordSplit = new SplitText(wordRef.current, { type: "words" });
    tl.from(wordSplit.words, {
      duration: 2,
      opacity: 0,
      y: 50,
      stagger: 0.4,
      ease: "power3.out"
    });

    // Character animation (after word animation completes)
    const charSplit = new SplitText(characterRef.current, { type: "chars" });
    tl.from(charSplit.chars, {
      duration: 0.8,
      opacity: 0,
      y: 20,
      rotationX: 180,
      stagger: 0.02,
      ease: "back.out(1.5)"
    }, "+=0.2"); // starts 0.5 seconds after previous animation ends

    // Line animation (after character animation completes)
    const lineSplit = new SplitText(lineRef.current, { type: "lines" });
    tl.from(lineSplit.lines, {
      duration: 1.2,
      opacity: 0,
      y: 100,
      stagger: 0.15,
      ease: "elastic.out(1, 0.3)"
    }, "+=0.2"); // starts 0.3 seconds after previous animation ends

    return () => {
      wordSplit.revert();
      charSplit.revert();
      lineSplit.revert();
      tl.kill();
    };
  }, []);





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



  // Add these styles to your CSS file or sx prop


  // Updated component code


  console.log("services", services)
  return (
    <div>


      <div className="heroDiv">
        <Grid className='' container spacing={3} >
          <Grid className="bg-  h-100 " size={{ xs: 12, sm: 12, md: 6, xl: 6 }}>
            <div className="text-animations-container text-start mt-5 " style={{ padding: '2rem' }}>
              <h1 className="display-1 " ref={wordRef} style={{ marginBottom: '2rem' }}>It's Bambrah Creation</h1>
              <h1 ref={characterRef} style={{ marginBottom: '1rem' }}>Dream Into Reality</h1>
              <h1 ref={lineRef}>Let's Build Your Dream Home</h1>
            </div>
          </Grid>
          <Grid className="bg- mt-5  h-100" size={{ xs: 12, sm: 12, md: 6, xl: 6 }}>


            {!isDark ?
              <Player className="h-100 w-100 m-2" src='https://cdn.lottielab.com/l/8Vnrmce9arZun4.json' loop autoplay />

              :
              <Player className="h-100 w-100 m-2" src='https://cdn.lottielab.com/l/ByWQ12HxwDie7U.json' loop autoplay />

            }

          </Grid>
        </Grid>
      </div>

      <div >
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
             <motion.span 

             whileHover={{scale:1.1}}
             transition={{duration:0.4, ease:'easeInOut'}}
             
             className="cursor-pointer">
               <GiTrophyCup fontSize={50} className="text-warning" />
             </motion.span>
              <Typography variant="h3" sx={{ fontWeight: 'bold', }}>
                <CountUp end={100} duration={22} ></CountUp>
              </Typography>
            </div>




            <Typography variant="h5">Completed Projects</Typography>

          </Grid>
          <Grid sx={{ marginTop: '20px' }} size={{ xs: 12, sm: 6, md: 4, xl: 4 }}>
            <img src='https://res.cloudinary.com/duxaqcmgc/image/upload/v1746183762/removebg_full_logo_vkqezy.png' alt="logo" style={{ height: '200px', width: '300px' }} />
          </Grid>
        </Grid>
      </div>

      <div className="custom-shape-div" >
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path style={{ fill: isDark ? '#454444' : 'white' }} d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>

      </div>
      <div className="bg- services-div" style={{ backgroundColor: isDark ? '#454444' : 'white' }} >
        <Container>
          <Typography className="text-start " variant="h4">Services</Typography>


          <Grid container spacing={5} sx={{ paddingTop: '50px' }}>
          {services.map((item, i) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} key={i}>
          <div className="" data-aos="zoom-in">
            {/* Card Container */}
            <motion.div
              onClick={() => handleCardFlip(i)}
              style={{ 
                perspective: "1000px",
                width: "100%",
                height: "220px",
                position: "relative",
                transformStyle: "preserve-3d" // Crucial for 3D effects
              }}
              animate={{ rotateY: isFlipped[i] ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-4"
              // whileHover={{y:-10}}
            >
              {/* Front Side */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                }}
                
               
                className="background rounded-4 ps-1 pb-1"
              >
                <Card className="shadow rounded-4 mx-auto h-100"
                  style={{ 
                    width: "100%", 
                    cursor: "pointer" 
                  }}>
                  <img className="w-100 h-100" src={item.img} alt={item.label} />
                  <Typography className="services-text text-start" variant="h5">
                    {item.label}
                  </Typography>
                </Card>
              </motion.div>

              {/* Back Side */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  rotateY: 180, // Initial rotation
                  zIndex: 1,
                  cursor: 'pointer'

                }}
               
                className="background rounded-4 ps-1 pb-1"
              >
                <Card className="rounded-4  p-3 w-100 shadow h-100">
                  <Typography className="p-2" variant="h5">
                    {item.label}
                  </Typography>
                  <p>{item.description}</p>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </Grid>
      ))}
          </Grid>
        </Container>

      </div>
      <div className="project-curve-top ">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path style={{ fill: isDark ? '#454444' : 'white' }} d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill-"></path>
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
                    <Grid className='bg- ' size={{ xs: 12, sm: 6, md: 4, xl: 4 }}  >
                      <Skeleton animation='wave' className='rounded-4 w-100' variant="rounded" height={220} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
                      <Skeleton animation='wave' className='rounded-4 w-100' variant="rounded" height={220} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4, xl: 4 }} >
                      <Skeleton animation='wave' className='rounded-4 w-100' variant="rounded" height={220} />
                    </Grid>
                  </Grid>

                </>)}


            </Grid>

            <Button variant="contained" sx={{ marginTop: '70px' }} className="rounded-4 text-white  ProjectButton" size="large" onClick={() => navigate('/projects')}>Veiw All Projects</Button>


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
    </div>
  );
};

export default Home;

