import React, { createContext, useState } from "react";

export const SideContext = createContext();

const SidebarContext = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleSidebar = () => {
    setOpen(!open);
  };

  return (
    <SideContext.Provider value={{ open, setOpen, handleSidebar }}>
      {children}
    </SideContext.Provider>
  );
};

export default SidebarContext;

