import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import UploadModal from "../UploadModal";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrip } from "../../store/Actions/tripActions";
import toast from "react-hot-toast";

const TripName = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { trip } = useSelector((state) => state.trip);
  const { trips , error} = useSelector((state) => state.selectedTrips);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong.Please try again!", error);
      dispatch(clearErrors());
      navigate("/");
    }
    const setTripAsync = async () => {
      if (!trip || trip.length <= 0) {
        await dispatch(setCurrentTrip(trips[0]));
      }
    };

    setTripAsync();
  }, [dispatch, trip, trips]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ArrowBackIcon
        sx={{
          fontSize: "2rem",
          margin: "2rem 0",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={handleBackBtn}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "2px solid black",
          borderRadius: "7px",
          padding: "1rem",
        }}
      >
        <Typography variant="h5">{trip ? trip.tripName : " "}</Typography>
        <Button
          sx={{
            textTransform: "none",
            color: "white",
            backgroundColor: "#141c33",
            padding: "0.6rem 3rem",
            borderRadius: "10px",
            fontSize: "1.3rem",
            transition: "opacity 0.3s",
            "&:hover": {
              opacity: 0.8,
            },
          }}
          onClick={handleOpen}
        >
          New
        </Button>
        <UploadModal open={open} onClose={handleClose} />
      </Box>
    </Box>
  );
};

export default TripName;
