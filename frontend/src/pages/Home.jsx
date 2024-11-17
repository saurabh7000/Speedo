import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import PaginationSection from "../components/Home/PaginationSection";
import UploadSection from "../components/Home/UploadSection";
import ButtonSection from "../components/Home/ButtonSection";
import TripListSection from "../components/Home/TripListSection";
import { useSelector } from "react-redux";

const Home = () => {
  const { totalTrips } = useSelector((state) => state.allTrips);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />
      <Box
        sx={{
          padding: {
            xs: "0.5rem 1rem",
            sm: "0.5rem 2rem",
            md: "0.2rem 10rem",
          },
        }}
      >
        <UploadSection totalTrips={totalTrips} />
        {!totalTrips || totalTrips <= 0 ? (
          <></>
        ) : (
          <>
            <ButtonSection />
            <TripListSection />
          </>
        )}
      </Box>
      <PaginationSection />
    </Box>
  );
};

export default Home;
