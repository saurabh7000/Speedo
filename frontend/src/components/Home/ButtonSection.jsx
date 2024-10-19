import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrips, tripDetails } from "../../store/Actions/tripActions";
import { useNavigate } from "react-router-dom";

const buttonStyle = {
  textTransform: "none",
  border: "1px solid black",
  borderRadius: "5px",
  fontSize: "1.2rem",
  padding: { xs: "0.2rem 1rem", sm: "0.2rem 3rem" },
};

const ButtonSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSelected } = useSelector((state) => state.isSelectedTrip);

  const handleSelectedTrips = () => {
    if (!Array.isArray(isSelected) || isSelected.length === 0) {
      console.error("Please provide an array of trip IDs.");
      return;
    }
    dispatch(tripDetails(isSelected));
    navigate("/trip/details");
  };

  const handleDeleteTrips = () => {
    if (!Array.isArray(isSelected) || isSelected.length === 0) {
      return;
    }
    dispatch(deleteTrips(isSelected));
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: { sm: "center", xs: "flex-start" },
        justifyContent: {
          xs: "flex-start",
          sm: "space-between",
        },
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        padding: "0.5rem",
        backgroundColor: {
          xs: "whitesmoke",
          sm: "transparent",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem" },
          marginBottom: { xs: "0.5rem", sm: "0" },
        }}
      >
        Your Trips
      </Typography>
      <Box
        sx={{
          width: { xs: "100%", sm: "30%" },
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button
          sx={{
            ...buttonStyle,
            color: "black",
          }}
          onClick={handleDeleteTrips}
        >
          Delete
        </Button>
        <Button
          sx={{
            ...buttonStyle,
            color: "white",
            backgroundColor: "#141c33",
          }}
          onClick={handleSelectedTrips}
        >
          Open
        </Button>
      </Box>
    </Box>
  );
};

export default ButtonSection;
