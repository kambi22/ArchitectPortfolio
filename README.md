# 🏗️ Architect Portfolio - Full Stack MERN Application.

This project is a fully functional Architect Portfolio Web Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to allow an architecture firm or an individual architect to showcase their services, completed projects, and design philosophy online, while also having admin functionality to manage and update the content.

# 🎯 Purpose of the Project
  The primary goal of this application is to:
  
  Professionally present architectural services and completed projects.
  
  Allow the admin (architect or firm owner) to manage the portfolio dynamically from a secured dashboard.
  
  Authenticate admin users securely using JWT-based login.
  
  Improve scalability and performance by implementing best practices such as code splitting, lazy loading, and Cloudinary image hosting.
  
  Provide a contact form that sends emails directly via EmailJS integration.
  
  Deliver a mobile-responsive and fast-loading experience for visitors.

# Core Features
✅ Public Pages
  Home Page: Displays introduction, services, featured projects, and contact info.
  
  Projects Page: Lists all architectural projects stored in the backend.
  
  Project Detail Page: Shows a detailed view of a selected project including images, description, and date.
  
  Contact Section: A contact form that sends messages to admin email using EmailJS.

# 🔐 Admin Functionality (Protected with JWT Authentication)
  Login Page: Secured login system for admin using JWT and cookie-based auth.
  
  Add Project: Admin can upload new projects (with image upload via Cloudinary).
  
  Edit Project: Modify existing projects from the dashboard.
  
  Delete Project: Remove projects permanently from the backend.
  
  Auto Session: Admin session stays active using cookies until manually logged out or token expires.

#⚙️ Tech Highlights
  Code Splitting & Lazy Loading for faster homepage performance.
  
  Cloudinary used for image hosting for better speed and scalability.
  
  Render backend hosting + Vercel frontend deployment.
  
  Responsive Design using CSS, MUI, and Bootstrap.
  
  .env Configurations for secure environment variables in deployment.

# 📈 How It Works – Summary
  Frontend (React):
  
  Loads public routes instantly.
  
  Lazy-loads admin pages to boost performance.
  
  Sends API requests to the backend via Axios using env-based URLs.
  
  Stores JWT in cookies and verifies auth status using /profile endpoint.
  
  Backend (Node.js/Express):
  
  Uses MongoDB for storing users and project data.
  
  Uses JWT for login and authentication with cookies.
  
  Middleware verifies protected routes before allowing access.
  
  CORS configured to allow frontend origin.
  
  Deployment:
  
  Frontend on Vercel.
  
  Backend on Render.
  
  Env variables securely managed on both platforms.
# 🛠️ Tech Stack

  Frontend:
  
  React.js
  
  Axios
  
  React Router DOM
  
  Material UI
  
  Cloudinary (Image hosting)
  
  Backend:
  
  Node.js
  
  Express.js
  
  MongoDB & Mongoose
  
  Multer & Cloudinary for file uploads
  
  JWT Authentication (Access Token stored in cookies)
  
  dotenv
  
  cookie-parser
  
  bcryptjs

# 🔐 Features

  ✅ Secure JWT-based login & signup
  
  ✅ Protected routes using middleware
  
  ✅ Stores JWT token in HTTP-only cookies
  
  ✅ Cloud-based image upload with Cloudinary
  
  ✅ Role-based architecture for project control
  
  ✅ Environment variables for secure configuration
  
  ✅ Axios configured for withCredentials support

# 🤝 Author

  Satnam Singh –  MERN Stack Developer
  
  Feel free to connect and collaborate on future projects!
