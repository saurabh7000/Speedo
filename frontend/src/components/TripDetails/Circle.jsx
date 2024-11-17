import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { Box, Typography } from "@mui/material";

const Circle = ({color, title}) => {
  return <Box sx={{display:"flex", alignItems:"center"}}>
    <CircleIcon sx={{color:{color}, fontSize:"2rem" }}/>
    <Typography sx={{margin:"0 0.8rem 0 0.5rem"}}>{title}</Typography>
  </Box>
};

export default Circle;
