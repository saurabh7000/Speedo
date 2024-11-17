import React from "react";
import { Box } from "@mui/material";
import logo from "../assets/logo.jpg";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "0.5rem",
        boxShadow:"0 0 0.9rem 0",
        width:"100vw"
      }}
    >
      <Box >
        <img src={logo} alt="Logo" style={{width:'10rem'}} />
      </Box>
    </Box>
  );
};

export default Header;
