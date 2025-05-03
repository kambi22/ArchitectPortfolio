import React from "react"
import {Outlet} from 'react-router-dom'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
const MainLayout = () => {
    return (
        <div className="bg- h-100">
           <Navbar/>
           <Sidebar/>
          
            <main className=""><Outlet/></main>

            
            <Footer />
        </div>
    )
};

export default MainLayout;
