import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import mapImage from "../../assets/mapImage.png";
import UploadModal from "../UploadModal";

const UploadSection = ({ totalTrips }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ margin: "2rem 0 2rem 0" }}>
      <Box
        sx={{
          display: "flex",
          border: "2px solid grey",
          alignItems: "center",
          padding: "0.5rem 2rem 0.5rem 2rem",
          borderRadius: "23px",
          fontSize: "2.5rem",
        }}
      >
        👋
        <Typography sx={{ fontSize: "2.5rem", margin: "0.2rem" }}>
          Welcome,User
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: {
            xs: "center",
            sm: !totalTrips || totalTrips <= 0 ? "center" : "flex-start",
          },
          border: "2px solid grey",
          borderRadius: "23px",
          margin: "1rem 0 2rem 0",
          padding: !totalTrips || totalTrips <= 0 ? "5rem 0 2rem 0" : "0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: !totalTrips || totalTrips <= 0 ? "column" : "row",
            },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!totalTrips || totalTrips <= 0 ? (
            <img src={mapImage} alt="map" style={{ width: "20rem" }} />
          ) : (
            <></>
          )}
          <Button
            sx={{
              textTransform: "none",
              color: "white",
              backgroundColor: "#141c33",
              margin: {
                xs: "2rem 0",
                sm: !totalTrips || totalTrips <= 0 ? "2rem 0" : "1rem",
              },
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
            Upload Trip
          </Button>

          <UploadModal open={open} onClose={handleClose} />

          <Typography sx={{ color: "gray", fontSize: "large" }}>
            Upload the
            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
              {" "}
              Excel{" "}
            </span>
            sheet of your trip
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadSection;
