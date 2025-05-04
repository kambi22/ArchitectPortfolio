const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const { Project, Admin } = require('./ModelSchema')
const streamifier = require('streamifier');
const { generatedToken, verifyToken, generateHash, comparePassword } = require('./jwtauth')
const jwt = require('jsonwebtoken')
require('./connection')
const app = express();
const PORT = 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser())
// Configure CORS options

app.use(cors({
  origin: 'https://itsbambrahcreation.vercel.app',
  credentials: true
}));


// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Multer Setup (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Upload Route
// app.post('/upload', upload.array('images'), async (req, res) => {
//   const { name, type, category, area, floor, location, elevation, description } = req.body;

//   console.log('Body data:', name, type, category, area, floor, location, elevation, description);
//   console.log('Files:', req.files); // Should contain uploaded images

//   res.status(200).json({ message: 'Upload successful' });
// });



app.post('/upload', upload.array('images'), async (req, res) => {
  try {
    const files = req.files;
    const { name, type, category, area, floor, location, elevation, description } = req.body;
    console.log("upload called")

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No images provided' });
    }

    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: name,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve({
              url: result.secure_url,
              public_id: result.public_id
            });
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    };


    const uploadedImages = await Promise.all(
      files.map(file => uploadToCloudinary(file.buffer))
    );


    const newProject = new Project({
      name,
      type,
      category,
      area,
      floor,
      elevation,
      location,
      description,
      images: uploadedImages, // Now images will have both url and public_id
    });


    const savedProject = await newProject.save();
    res.status(201).json({ message: 'Project successfully saved', project: savedProject });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error });
  }
});

app.get('/project', async (req, resp) => {
  try {
    const project = await Project.find();
    resp.status(200).json(project)
  } catch (error) {
    resp.status(500).json({ error: error.message });
  }

})
app.get('/projectbyid/:id', async (req, resp) => {
  const id = req.params.id;
  const project = await Project.findById(id);
  resp.status(201).json(project)
})

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Project.findByIdAndDelete(id); // ✔ more readable
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
});



app.delete("/delete-images/:public_id", async (req, res) => {
  try {
    let Public_Id = req.params.public_id;

    // decode public_id in case it has URL encoding (like %2F for /)
    Public_Id = decodeURIComponent(Public_Id);

    const result = await cloudinary.uploader.destroy(Public_Id);

    if (result.result !== 'ok') {
      return res.status(404).json({ error: 'Image not found or already deleted' });
    }

    res.status(200).json({ message: 'Image successfully deleted from Cloudinary' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/update/:id', upload.array('localImages'), async (req, res) => {
  try {
    const projectId = req.params.id;
    const { dbImages, name, type, category, area, floor, elevation, location, description } = req.body;
    const localImages = req.files; // Local images received from frontend

    // Parse dbImages (which were stringified in frontend)
    const existingImages = JSON.parse(dbImages);


    console.log("db images:", existingImages)

    // Upload local images to Cloudinary
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: name, // You can customize the folder name
          },
          (error, result) => {
            if (error) return reject(error);
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    };

    // // Upload all the local images to Cloudinary and get their URLs and public_ids
    const newImages = await Promise.all(
      localImages.map(file => uploadToCloudinary(file.buffer))
    );

    // // Combine both dbImages (existing) and newImages (uploaded) into one array
    const finalImages = [
      ...existingImages,
      ...newImages
    ];

    // // Find the project and update it
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        name,
        type,
        category,
        area,
        floor,
        elevation,
        location,
        description,
        images: finalImages, // Updated images array
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("passwor", password)
    const hashedPassword = await generateHash(password)

    const newAdmin = new Admin({ name, email, password: hashedPassword })
    console.log('newAdmin', newAdmin)

    await newAdmin.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.post('/login', async (req, resp) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({email});

    if(!user){return resp.status(404).json({error:'User not found, please provide correct info'})}

    const checkPass = await comparePassword(password, user.password)
    
    if(!checkPass){return resp.status(400).json({error:'Invailed Password'})}

    const token =  generatedToken(user._id)
    resp.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: 'Lax'
    });
    
    
    resp.status(200).json({ 
      authenticated: true,
      user: user 
    });


  } catch (err) {
    resp.status(400).json({authenticated: false, error: err.message })
  }
})



// token verification midaleware
const verification = (req, resp, next) => {
  const token = req.cookies.token;
  if (!token) return resp.status(403).json({ authenticated: false, error: 'No token provided' });
  
  try {
    const decoded = verifyToken(token);
    
    // Optional: Add basic user info to request
    req.auth = {
      isAuthenticated: true,
      userId: decoded.id,
      // Other token claims...
    };
    
    next();
  } catch (error) {
    resp.status(403).json({ authenticated: false, error: `Token error: ${error.message}` });
  }
}
app.get('/profile', verification, (req, resp) => {
  resp.json({
    authenticated: true,
    user: req.auth // Return what's already in the verified token
  });
});;

app.post('/logout', (req, resp) => {
  resp.clearCookie('token');
  resp.status(200).json({ 
    authenticated: false,
    message: "Logged out" 
  });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
