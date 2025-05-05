import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { Alert, AlertTitle, Box, Button, Container, Grid, TextField } from '@mui/material'
import { useParams } from "react-router";
import { notify, toast } from '../layouts/Notify';
export default function EditProject() {
  const [localImages, setLocallocalImages] = useState([]);
  const [dbImages, setDbImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [projectData, setProjectData] = useState({
    name: '',
    type: '',
    category: '',
    area: '',
    floor: 0,
    elevation: '',
    location: '',
    description: ''
  });
  const fileInputRef = useRef();
  const { id } = useParams();
   const [showAlert , setShowAlert ] = useState(false);
  
    const handleAlert = () => {
        setShowAlert(!showAlert)
    }


  console.log('local images:', localImages)
  console.log('db images:', dbImages)
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error('Compression failed:', error);
      return file;
    }
  };

  const handleFiles = async (files) => {
    const selectedFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

    const imagePreviews = await Promise.all(
      selectedFiles.map(async (file) => {
        const compressed = await compressImage(file);
        const id = URL.createObjectURL(compressed);
        return { id, file: compressed, preview: id };
      })
    );

    setLocallocalImages(prev => [...prev, ...imagePreviews]);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
    e.currentTarget.classList.remove('dragover');
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const removeLocalImages = (id) => {
    setLocallocalImages(prev => prev.filter(img => img.id !== id));
  };
  const removeDbImages = (public_id, index) => {
    const encodedPublicId = encodeURIComponent(public_id); // Important!


    const newArray = [...dbImages]; // Create a shallow copy
    newArray.splice(index, 1);       // Remove 1 item at the given index
    setDbImages(newArray);

    axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete-images/${encodedPublicId}`)
      .then((result) => console.log(`Image ${public_id} deleted`, result.data))
      .catch((error) => console.error(`Failed to delete image ${public_id}`, error));
  };
  // Update state

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    if (!localImages.length && !dbImages.length) return;
    setUploading(true);

    const formData = new FormData();

    // Add local images (compressed files)
    localImages.forEach((img) => {
      formData.append('localImages', img.file); // backend will receive array of images
    });

    // Add project text fields
    Object.entries(projectData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Add dbImages (already uploaded Cloudinary images)
    formData.append('dbImages', JSON.stringify(dbImages));
    // Backend will receive dbImages as a string. You will JSON.parse it there.

    try {
      const resp = await axios.put(`${import.meta.env.VITE_SERVER_URL}/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Successfully updated:', resp.data);
      setLocallocalImages([]);
      setDbImages([]);
      setProjectData({
        name: '',
        type: '',
        category: '',
        area: '',
        floor: 0,
        elevation: '',
        location: '',
        description: ''
      });

      notify('success', 'Sucess', 'Project successfully updated.');

    } catch (err) {
      console.error('Upload error:', err);
      toast('error', 'Error', 'bottom-left', true);
    } finally {
      setUploading(false);
    }
  };


  const handleChangeInput = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value }); // ✅ remove brackets

  }


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/projectbyid/${id}`)
      .then((result) => {
        console.log('project updatedAt', result.data.updatedAt),
        setProjectData({
          name: result.data.name,
          type: result.data.type,
          category: result.data.category,
          area: result.data.area,
          floor: result.data.floor,
          elevation: result.data.elevation,
          location: result.data.location,
          description: result.data.description,
        }), setDbImages(result.data.images)
      })
      .catch((error) => console.error("fialed to fetch project on front end"))
  }, []);


  return (
    <div>
 
      <Container className="mt-5">
 
      <h4 className='fw-bold text-start mb-5'>Edit Project</h4>

        <div className="">
          <div
            className="file-upload-container"
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.currentTarget.classList.remove('dragover')}
          >
            <h4 className='' style={{ color: 'GrayText' }}>Click or Drag & Drop localImages Here</h4>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </div>

          <div className="preview-container">
            <Grid container spacing={2}>
              <>
                {dbImages.map((img, i) => (
                  <Grid key={i} item size={{ xl: 2, md: 3, sm: 4, xs: 6 }}>
                    <div className=" bg- preview-box">
                      <Button variant='outlined' className="remove-btn bg- rounded-5 text-white" onClick={() => removeDbImages(img.public_id, i)}>X</Button>

                      <img src={img.url} alt="preview" className="rounded-4 w-100" />
                    </div>
                  </Grid>

                ))}
                {localImages.map((img, i) => (
                  <Grid key={i} item size={{ xl: 2, md: 3, sm: 4, xs: 6 }}>
                    <div className=" bg- preview-box">
                      <Button variant='outlined' className="remove-btn bg- rounded-5 text-white" onClick={() => removeLocalImages(img.id)}>X</Button>

                      <img src={img.preview} alt="preview" className="rounded-4 w-100" />
                    </div>
                  </Grid>

                ))}
              </>

            </Grid>

          </div>


        </div>

        <Box className='mt-5' component='form' onSubmit={handleUpdateProject}>
          <Grid container spacing={2}>
            <Grid item size={{ xl: 8, md: 8, sm: 12, xs: 12 }}>
              <TextField fullWidth className='' label='Project Name' placeholder='Enter project name' type='text' name='name'
                onChange={handleChangeInput} value={projectData.name} required />
            </Grid>
            <Grid item size={{ xl: 4, md: 4, sm: 12, xs: 12 }}>
              <TextField fullWidth className='' label='Project Type' placeholder='Enter project type' type='text' name='type'
                onChange={handleChangeInput} value={projectData.type} required />
            </Grid>
            <Grid item size={{ xl: 4, md: 4, sm: 12, xs: 12 }}>
              <TextField fullWidth className='' label='Enter Category' placeholder='Enter project category' type='text' name='category'
                onChange={handleChangeInput} value={projectData.category} required />
            </Grid>
            <Grid item size={{ xl: 4, md: 4, sm: 12, xs: 12 }}>
              <TextField fullWidth className='' label='Enter Area' placeholder='Enter project area' type='text' name='area'
                onChange={handleChangeInput} value={projectData.area} required />
            </Grid>
            <Grid item size={{ xl: 4, md: 4, sm: 12, xs: 12 }}>
              <TextField fullWidth className='' label='Enter Floor' placeholder='Enter project floor' type='number' name='floor'
                onChange={handleChangeInput} value={projectData.floor} required />
            </Grid>
            <Grid item size={{ xl: 6, md: 6, sm: 12, xs: 12 }}>
              <TextField fullWidth className='' label='Enter Location' placeholder='Enter project location' type='text' name='location'
                onChange={handleChangeInput} value={projectData.location} required />
            </Grid>
            <Grid item size={{ xl: 6, md: 6, sm: 12, xs: 12 }}>
              <TextField fullWidth className='' label='Enter Elevation' placeholder='Enter project elevation' type='text' name='elevation'
                onChange={handleChangeInput} value={projectData.elevation} required />
            </Grid>
            <Grid item size={{ xl: 12, md: 12, sm: 12, xs: 12 }}>
              <TextField fullWidth className='' label='Enter Description' placeholder='Enter project description' type='text' name='description'
                onChange={handleChangeInput} multiline rows={4} value={projectData.description} required />
            </Grid>
          </Grid>
          <div className="text-end mt-5 bg-">
            <Button variant='contained' className="" type='submit' disabled={uploading}>
              {uploading ? 'Uploading...' : 'Update Project'}
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
}
