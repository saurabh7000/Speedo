import { Box } from "@mui/material";
import React from "react";
import TripName from "../components/TripDetails/TripName";
import Header from "../components/Header";
import TripInfo from "../components/TripDetails/TripInfo";
import PaginationSection from "../components/Home/PaginationSection";
import MapSection from "../components/TripDetails/MapSection";

const TripDetails = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          padding: {
            xs: "1rem",
            sm: "2rem",
            md: "3rem 5rem",
            lg: "4rem 10rem",
          },
        }}
      >
        <TripName />
        <MapSection />
        <TripInfo />
      </Box>
    </>
  );
};

export default TripDetails;
