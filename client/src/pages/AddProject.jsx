import React, { useState, useRef } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { Box, Button, CircularProgress, Container, Grid, TextField } from '@mui/material'
import { notify, toast } from '../layouts/Notify';
export default function AddProject() {
  const [images, setImages] = useState([]);;
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

    setImages(prev => [...prev, ...imagePreviews]);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
    e.currentTarget.classList.remove('dragover');
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleAddproject = async (e) => {
    e.preventDefault();

    console.log("project data:", projectData.name, projectData.type, projectData.category, projectData.area
      , projectData.floor, projectData.elevation, projectData.location, projectData.description
    )
    if (!images.length) return;
    setUploading(true);

    const formData = new FormData();
    images.forEach((img, index) => {
      formData.append('images', img.file); // backend will receive as array
    });

    Object.entries(projectData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log('formdata: ', images)

    try {
      axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((resp)=>{
        console.log('Upload successful:', resp.data);
        setImages([]);
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

        notify('success','Success','Project Successfully Uploaded')
      })
      
    } catch (err) {
      console.error('Upload error:', err);
     toast('error','Failed Upload','top-right',true)
    } finally {
      setUploading(false);
    }
  };

  const handleChangeInput = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value }); // ✅ remove brackets

  }



  return (
    <div>

      <Container className="mt-5">
        <h4 className='fw-bold text-start mb-5'>Add New Project</h4>
        <div className="">
          <div
            className="file-upload-container"
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.currentTarget.classList.remove('dragover')}
          >
            <h4 className='' style={{ color: 'GrayText' }}>Click or Drag & Drop Images Here</h4>
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
              {images.map((img, i) => (
                <Grid key={i} item size={{ xl: 2, md: 3, sm: 4, xs: 6 }}>
                  <div  className=" bg- preview-box">
                    <Button variant='outlined' className="remove-btn bg- rounded-5 text-white" onClick={() => removeImage(img.id)}>X</Button>

                    <img key={img.id} src={img.preview} alt="preview" className="rounded-4 w-100" />
                  </div>
                </Grid>

              ))}

            </Grid>

          </div>


        </div>
        
        {uploading? <CircularProgress   size={50} sx={{position:'absolute',margin:'auto'}} />: null }
        <Box className='mt-5' component='form' onSubmit={handleAddproject}>
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
        
        <Button variant='contained' disabled={uploading}>{uploading? <CircularProgress className='me-2' size={20} color='black' />:null}{uploading ? 'Uploading...' : 'Add Project'}</Button>
          </div>
        </Box>
      </Container>
    </div>
  );
}
