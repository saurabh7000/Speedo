import React from "react";
import { Box } from "@mui/material";
import Trip from "./Trip";
import {  useSelector } from "react-redux";

const TripListSection = () => {

  const { totalTrips, trips } = useSelector((state) => state.allTrips);

  return (
    <Box sx={{ padding: "0.5rem 0 0.5rem 1.3rem" }}>
      {totalTrips > 0 ? (
        trips.map((trip) => (
          <Trip key={trip._id} id={trip._id} tripName={trip.tripName} />
        ))
      ) : (
        <></>
      )}
    </Box>
  );
};

export default TripListSection;
