require('dotenv').config();
const mongoose = require('mongoose')

console.log('connection: ',process.env.MONGODB_URI)
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection error Error:", err));


  const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
  
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err);
      console.log('⏳ Retrying connection in 5 seconds...');
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
  };
  
  connectWithRetry();
  //schema
  