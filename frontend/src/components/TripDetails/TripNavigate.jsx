import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrip } from "../../store/Actions/tripActions";

const navigateBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid black",
  padding: "0",
  "&:hover": {
    cursor: "pointer",
    color: "#0099ff",
    border: "1px solid #0099ff",
  },
};

const TripNavigate = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [currTrip, setCurrTrip] = useState(null);
  const { trips } = useSelector((state) => state.selectedTrips);

  const tabs = [...trips];

  const currTripIndex = currTrip
    ? tabs.findIndex((trip) => trip.id === currTrip.id)
    : -1;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTripChange = async (trip) => {
    if (trip) {
      dispatch(setCurrentTrip(trip));
      setCurrTrip(trip);
    }
  };

  const handlePrevious = async () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + 10 < tabs.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderBottom: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "1rem 0",
      }}
    >
      <Box sx={navigateBoxStyle} onClick={handlePrevious}>
        <NavigateBeforeOutlinedIcon />
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {tabs.slice(startIndex, startIndex + 10).map((label, index) => (
          <Tab
            key={index + startIndex}
            label={label.tripName}
            sx={{ textTransform: "none" }}
            onClick={() => handleTripChange(label)}
          />
        ))}
      </Tabs>
      <Box sx={navigateBoxStyle} onClick={handleNext}>
        <NavigateNextOutlinedIcon />
      </Box>
    </Box>
  );
};

export default TripNavigate;
