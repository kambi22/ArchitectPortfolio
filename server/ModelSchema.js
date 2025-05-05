const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    type: String,
    category: String,
    area: String,
    floor: Number,
    elevation: String,
    location: String,
    description: String,
    images: [
      {
        url: String,
        public_id: String
      }
    ]
  },{ timestamps: true });


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const homeProjectImgSchema = new mongoose.Schema({
  images: [
    {
      url: String,
      label: String
    }
  ]
});

const Project = mongoose.model('Project', projectSchema);
const Admin = mongoose.model('Admin', userSchema);
const HomeProjectImg = mongoose.model('homeprojectimg', homeProjectImgSchema, 'homeprojectimg');


module.exports = {Project, Admin, HomeProjectImg};