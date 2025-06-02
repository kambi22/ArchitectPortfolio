import { Box, Card, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import { FaChartArea, FaLayerGroup, FaLocationDot } from "react-icons/fa6";
import { PiBuildingsFill } from "react-icons/pi";
import { TbRotate3D } from "react-icons/tb";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { useParams } from "react-router";
import axios from "axios";
import { MdDateRange } from "react-icons/md";
import { Player } from "@lottiefiles/react-lottie-player";
import { themeContext } from "../context/themContext";
const ProjectDetail = (props) => {
    const { isDark, toggleTheme } = useContext(themeContext);
    const [project, setProject] = useState();
    const [images, setImages] = useState([]);
    const [imgId, setImgId] = useState(0);
    const [updatedDate, setUpdateDate] = useState();
    const [loading, setLoading] = useState(false);
    const [newDate, setNewDate] = useState();
    const { id } = useParams();

//     // console.log('project updated date',project.updatedAt)
//     const date = new Date(updatedDate);

// // Convert to readable format

// const readableDate = date.toLocaleString('en-US', {
//   weekday: 'long', // "Monday"
//   year: 'numeric', // "2025"
//   month: 'long', // "April"
//   day: 'numeric', // "27"
//   hour: '2-digit', // "07"
//   minute: '2-digit', // "50"
//   second: '2-digit', // "45"
//   hour12: true, // "AM/PM"
// });
// setNewDate(readableDate)
// console.log('read able date',readableDate); // Example Output: "Sunday, April 27, 2025, 07:50:45 AM"


    useEffect(() => {
       try {
        setLoading(true)
        // axios.get(`${import.meta.env.VITE_SERVER_URL}/projectbyid/${id}`)
        axios.get(`${import.meta.env.VITE_SERVER_URL}/projectbyid/${id}`)
        .then((result) => { setProject(result.data), console.log("result:", result.data),
             setImages(result.data.images), setUpdateDate(result.data.updatedAt), console.log('images', result.data.images) })
        .catch((error) => console.error("error to fetch project by id", error))
       } catch (error) {
        console.log('error fetch project details',error)
       }finally{
        setLoading(false)
       }
    }, []);

    return (
        <div>
            <Container className="mt-5" maxWidth='xl'>
                <Grid container spacing={2}>
                    {project ? (
                        <>
                            <Grid item size={{ xl: 8, md: 8, sm: 12, xs: 12 }}>
                                <Card className="w-100 bg- rounded-4 shadow" >
                                    <img className="w-100 h-100" src={images[imgId].url} alt="" />
                                </Card>
                                <Card className="w-100 bg- rounded-4 mt-2 p-3 shadow" style={{ height:'fit-content' }}>
                                    <h4 className="text-start">Details</h4>
                                    <div className="d-flex w-100 mt-2  ">

                                        <Typography className="w-50  text-start" variant="h8">Name: {project.name} </Typography>
                                        <Typography className="w-50  text-start" variant="h8"><PiBuildingsFill /> Type: {project.type}</Typography>
                                    </div>
                                    <div className="d-flex w-100 mt-2">
                                        <Typography className="w-50  text-start" variant="h8"><FaChartArea /> Area: {project.area}</Typography>
                                        <Typography className="w-50  text-start" variant="h8"><FaLayerGroup /> Floor: {project.floor}</Typography>
                                    </div>
                                    <div className="d-flex w-100 mt-2 ">
                                        <Typography className="w-50  text-start" variant="h8"><TbRotate3D /> Elevation Type: {project.elevation}</Typography>
                                        <Typography className="w-50  text-start" variant="h8"><BiSolidCategoryAlt /> Category: {project.category}</Typography>
                                    </div>
                                    <div className="d-flex w-100 mt-2 ">
                                        <Typography className="w-50  text-start" variant="h8"><FaLocationDot /> Location: {project.location}</Typography>
                                        <Typography className="w-50  text-start" variant="h8"><MdDateRange /> Updated Dated: {newDate}</Typography>
                                    </div>
                                  

                                </Card>
                                 {loading && (
                                                        <div className="m-auto  bg-successk" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5, position: 'absolute' }}>
                                
                                                            <Player className="bg-k " src='https://lottie.host/5a71c736-8150-4cf0-b870-7d97d992f1bc/y3KFjegVpO.json' loop autoplay style={{ height: '150px', width: '150px' }} />
                                                        </div>
                                                    )}
                                <Card className="w-100 bg- rounded-4 mt-2 p-3 shadow" style={{ height: '200px',overflowY:'scroll'}}>
                                    <h4 className="text-start">Description</h4>
                                    <p className="text-start " style={{color:isDark?'white':'inherit'}} >{project.description}</p>

                                    
                                </Card>
                            </Grid>
                            <Grid item size={{ xl: 4, md: 4, sm: 12, xs: 12 }}>
                                <Box className='project-detail-scroll rounded-4' >
                                    {images && images.map((img, i) =>
                                        <Card key={i} sx={{cursor:'pointer'}} onClick={()=>setImgId(i)} className="w-100 mb-2 rounded-4 shadow" >
                                            <img className="w-100 h-100" src={img.url} alt={project.name} />
                                        </Card>
                                    )}

                                </Box>

                            </Grid>
                        </>

                    ) : (
                        <div className="m-auto  bg-successk" style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5, position: 'absolute' }}>
                                
                        <Player className="bg-k " src='https://lottie.host/5a71c736-8150-4cf0-b870-7d97d992f1bc/y3KFjegVpO.json' loop autoplay style={{ height: '150px', width: '150px' }} />
                    </div>
                    )}


                </Grid>
            </Container>
        </div>
    )
};

export default ProjectDetail;
