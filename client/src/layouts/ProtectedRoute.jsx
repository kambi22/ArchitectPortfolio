import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { LogContext } from '../context/LoginContext';
import { CircularProgress } from '@mui/material';


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useContext(LogContext);

//   component: Component:
// We expect a prop named component to be passed to ProtectedRoute
// We rename it to Component (with capital C) because in JSX, components must start with capital letters
// Example: If called like <ProtectedRoute component={AddProject} />, Component will be AddProject
// ...rest:
// This collects all remaining props that weren't explicitly destructured
// The ... is called the "rest operator" in this context
// Example: If called like <ProtectedRoute component={AddProject} color="blue" />, rest would be { color: "blue" }

  if (loading) {
    return <div><CircularProgress size={30}/></div>; // Or a spinner
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" replace />;
//   replace prop:

// When true, replaces the current entry in the history stack instead of adding a new one
// This means the user can't click "back" to return to the protected page they tried to access
// Without replace, the login page would be added to history, and back button would return to protected page
};

export default ProtectedRoute;
