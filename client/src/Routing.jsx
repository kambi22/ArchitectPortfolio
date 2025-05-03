import React, { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router";
import SidebarContext from "./context/SidebarContext";
import MainLayout from "./layouts/MainLayout";
import Projects from './pages/Projects'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact';
import PageNotFound from "./pages/404";
import Login from './pages/Login'
import ProtectedRouted from "./layouts/ProtectedRoute";
import LoginContext from "./context/LoginContext";
import { CircularProgress, LinearProgress } from "@mui/material";
const Routing = (props) => {

    const ProjectDetailLazy = lazy(() => import('./pages/ProjectDetail'))
    const AddProjectLazy = lazy(() => import('./pages/AddProject'))
    const EditProjectlLazy = lazy(() => import('./pages/EditProject'))
    return (
        <SidebarContext>
            <LoginContext>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />} >
                            <Route index element={<Home />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/projects/:id" element={<Suspense fallback={<div><CircularProgress size={30}/> Loading...</div>}><ProjectDetailLazy /></Suspense>} />
                            <Route
                                path="/add-project"
                                element={
                                    <Suspense fallback={<div><CircularProgress size={30}/> Loading...</div>}>
                                        <ProtectedRouted component={AddProjectLazy} />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/projects/edit-project/:id"
                                element={
                                    <Suspense fallback={<div><CircularProgress size={30}/> Loading...</div>}>
                                        <ProtectedRouted component={EditProjectlLazy} />
                                    </Suspense>
                                }
                            />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/*" element={<PageNotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </LoginContext>
        </SidebarContext>
    )
};

export default Routing;
