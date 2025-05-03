import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Typography } from "@mui/material";

import React from "react"

const PageNotFound = (props) => {
  return (
    <div className="" style={{ marginBottom: '200px' }}>
      <div className="">
      <Player  src="https://lottie.host/6c65985b-52e2-4d16-9203-8b7ddc36290d/ZS1FkEWTK5.json" style={{ height: '300px', width: '300px' }} autoplay loop />
     
      <Typography variant="h5">Oop's Page Not Found!</Typography>
      </div>
    </div>
  )
};

export default PageNotFound;
