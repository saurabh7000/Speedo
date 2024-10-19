import { Box, Checkbox, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTrip,
  deleteTrips,
  removeTrip,
  tripDetails,
} from "../../store/Actions/tripActions";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Trip = ({ id, tripName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chekced, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked;

      if (newChecked) {
        dispatch(addTrip(id));
      } else {
        dispatch(removeTrip(id));
      }
      return newChecked;
    });
  };

  const deleteTripHandler = () => {
    const trip = [id];
    dispatch(deleteTrips(trip));
    window.location.reload();
  };

  const handleSelectedTrip = () => {
    const trip = [id];
    dispatch(tripDetails(trip));
    navigate("/trip/details");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "0.5rem 0",
        borderBottom: {
          xs: "2px solid #d9d9d9",
          sm: "2px solid #d9d9d9",
          md: "none",
        },
        "&:hover": {
          backgroundColor: "whitesmoke",
          borderBottom: { md: "2px solid #d9d9d9" },
        },
      }}
    >
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "&:hover": {
            borderRight: "2px solid #d9d9d9",
          },
        }}
      >
        <Checkbox
          checked={chekced}
          onClick={handleCheck}
          sx={{
            borderRadius: "0",
            padding: "0",
            marginRight: "0.5rem",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "&:hover": {
            borderLeft: "2px solid #d9d9d9",
            backgroundColor: "whitesmoke",
          },
        }}
      >
        <Typography sx={{ marginLeft: "0.5rem" }}>{tripName} </Typography>

        <Box
          sx={{
            display: { xs: "flex", sm: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <DeleteIcon
            sx={{
              color: "gray",
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={deleteTripHandler}
          />
          <KeyboardArrowRightIcon
          onClick = {handleSelectedTrip}
            sx={{
              color: "gray",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Trip;
