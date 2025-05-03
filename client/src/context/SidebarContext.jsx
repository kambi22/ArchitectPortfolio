import React, { createContext, useState } from "react"

export const SideContext = createContext()
const SidebarContext = ({children}) => {
    const [open , setOpen ] = useState(false);
    

    const handleSidebar = () => {
        setOpen(!open)
    }
  return (
    <SideContext value={{open, setOpen, handleSidebar}}>
        {children}
    </SideContext>
  )
};

export default SidebarContext;
