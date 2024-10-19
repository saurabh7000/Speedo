import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SignBox from "./SignBox";
import TripInfoTable from "./TripInfoTable";
import TripNavigate from "./TripNavigate";
import { useSelector } from "react-redux";
import PaginationSection from "./PaginationSection";

const TripInfo = () => {
  const [currPage, setCurrPage] = useState(1);
  const { trip } = useSelector((state) => state.trip);
  const totalDistance = trip?.distance || 0;
  const totalDuration = trip?.duration || 0;
  const overSpeedDuration = trip?.overSpeedDuration || 0;
  const overSpeedDistance = trip?.overSpeedDistance || 0;
  const stoppedDuration = trip?.stoppedDuration || 0;
  const tripLength = trip ? trip.tripDetail.length : 0;
  const itemsPerPage = 10;

  const getCurrentPageItems = () => {
    if (!trip || !trip.tripDetail) return [];
    const startIndex = (currPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return trip.tripDetail.slice(startIndex, endIndex);
  };

  const currentPageItems = getCurrentPageItems();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TripNavigate />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: {
            xs: "center",
            sm: "space-evenly",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <SignBox
          type={1}
          color={"blue"}
          info={`${totalDistance} KM/H`}
          title={"Total Distance Travelled"}
        />
        <SignBox
          type={2}
          color={"#1ab2ff"}
          info={`${totalDuration} Mins`}
          title={"Total Travelled Duration"}
        />
        <SignBox
          type={2}
          color={"#99ffdd"}
          info={`${overSpeedDuration} Mins`}
          title={"Over Speeding Duration"}
        />
        <SignBox
          type={1}
          color={"#66ffb3"}
          info={`${overSpeedDistance} KM/H`}
          title={"Over Speeding Distance"}
        />
        <SignBox
          type={2}
          color={"blue"}
          info={`${stoppedDuration} Mins`}
          title={"Stopped Duration"}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.5rem",
        }}
      >
        <TripInfoTable
          trip={currentPageItems}
          totalDistance={totalDistance}
          totalDuration={totalDuration}
          overSpeedDuration={overSpeedDuration}
          stoppedDuration={stoppedDuration}
        />
      </Box>
      <PaginationSection
        currPage={currPage}
        setCurrPage={setCurrPage}
        tripLength={tripLength}
      />
    </Box>
  );
};

export default TripInfo;
