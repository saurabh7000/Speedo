import React from "react";
import { FaClock } from "react-icons/fa6";
import { Box, Typography } from "@mui/material";
import routeBlue from "../../assets/routeBlue.png";
import routeGreen from "../../assets/routeGreen.png";

const SignBox = ({ type, color, info, title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        padding: "1rem ",
        width: "12rem",
        borderRadius: "5px",
        margin: "0.5rem",
      }}
    >
      {type == 1 ? (
        <img
          src={color === "blue" ? routeBlue : routeGreen}
          alt="distance"
          style={{ width: "2rem" }}
        />
      ) : (
        <FaClock style={{ color: color, fontSize: "2rem" }} />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">{info}</Typography>
        <Typography>{title}</Typography>
      </Box>
    </Box>
  );
};

export default SignBox;
