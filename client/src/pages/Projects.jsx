import { Card, CardContent, Container, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import { FaChartArea, FaLayerGroup, FaLocationDot } from "react-icons/fa6";
import { PiBuildingsFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import AOS from 'aos'
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { LoadingCard, notifyconfirm, toast } from "../layouts/Notify";
import { LogContext } from "../context/LoginContext";
const Projects = (props) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(LogContext)
  const navigate = useNavigate();


  useEffect(() => {
    AOS.refresh();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, []);
  console.log("backend server", import.meta.env.VITE_SERVER_URL)


  const fetchProject = () => {
    try {
      setLoading(true)
      // axios.get(`${import.meta.env.VITE_SERVER_URL}/project`)
      axios.get(`${import.meta.env.VITE_SERVER_URL}/project`)
        .then((result) => setProjects(result.data))
        .catch((error) => console.log('error', error))
    } catch (error) {
      console.log("error to fetch projects", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProject();
  }, []);

  const projectDetail = (id) => {
    navigate(`/projects/${id}`)
  }

  const DeleteProject = (item, e) => {
    e.preventDefault();    // stop Link navigation
    e.stopPropagation();
    notifyconfirm('warning', 'Delete', `Are you sure you want to delete ${item.name} project?`, true, true)
      .then((result) => {
        if (result.isConfirmed) {
          console.log('User clicked OK');
          axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete/${item._id}`)
            .then((result) => {
              console.log('result', result.data),
                toast('success', 'Project sucessfully Deleted', 'bottom-left', true)
              fetchProject()
             

            })
            .catch((error) => console.error("error to delete project", error))
        } else if (result.isDismissed) {
          console.log('User clicked Cancel');
        }
      });
  }

  const handleEditProject = (e, item) => {
    e.preventDefault();    // stop Link navigation
    e.stopPropagation();   // stop click bubbling
    navigate(`edit-project/${item._id}`);
  };

  return (
    <div>
      <Container className="mt-5">
        <Grid container spacing={3}>
          {projects && projects.length > 0 ? (
            projects.map((item, i) => (
              <Grid key={i} size={{ xl: 4, md: 4, sm: 6, xs: 12 }}>

                <Card onClick={() => projectDetail(item._id)} data-aos="zoom-in" className="shadow rounded-4 text-start" sx={{ cursor: 'pointer' }}>
                  <CardContent className="h-100 w-100 p-0">
                    {/* Use item.images[0] or fallback */}
                    <img
                      className="w-100 rounded-bottom-"
                      src={item.images?.[0].url}
                      alt={item.name}
                      style={{ height: '250px' }}
                    />
                    <div className="m-3 text-muted">
                      <div className="d-flex">
                        <Typography className="mt-2 inheritColor" variant="h5">{item.name}</Typography>

                        {isAuthenticated ? (
                          <>
                            <IconButton className="ms-auto" onClick={(e) => handleEditProject(e, item)}><MdEdit /></IconButton>
                            <IconButton onClick={(e) => DeleteProject(item, e)} ><MdDelete /></IconButton>
                          </>
                        ) : null}
                      </div>
                      <Typography className="mt-2 inheritColor" variant="h6">
                        <PiBuildingsFill /> {item.type}
                      </Typography>
                      <div className="d-flex mt-2 inheritColor">
                        <Typography variant="body2">
                          <FaChartArea className="me-2" /> {item.area}
                        </Typography>
                        <Typography className="mx-auto inheritColor" variant="body2">
                          <FaLayerGroup className="me-1" /> Floor: {item.floor}
                        </Typography>
                      </div>
                      <Typography style={{ marginTop: '10px' }} className="inheritColor" variant="body2">
                        <FaLocationDot className="me-1" /> {item.location}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>

              </Grid>
            ))
          ) : (


            <>
              <Grid className='bg- ' size={{ xl: 4, md: 4, sm: 6, xs: 12 }}>
                <LoadingCard />
              </Grid>
              <Grid className='bg- ' size={{ xl: 4, md: 4, sm: 6, xs: 12 }}>
                <LoadingCard />
              </Grid>
              <Grid className='bg- ' size={{ xl: 4, md: 4, sm: 6, xs: 12 }}>
                <LoadingCard />
              </Grid>
              <Grid className='bg- ' size={{ xl: 4, md: 4, sm: 6, xs: 12 }}>
                <LoadingCard />
              </Grid>
              <Grid className='bg- ' size={{ xl: 4, md: 4, sm: 6, xs: 12 }}>
                <LoadingCard />
              </Grid>
            </>


          )}


        </Grid>



      </Container>
    </div>
  )
};

export default Projects;
