import React from "react";
import { Box } from "@mui/material";
import Circle from "./Circle";
import Map from "./Map";

const MapSection = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", margin: "1rem 0" }}>
        <Circle color={"#0021f7"} title={"Stopped"} />
        <Circle color={"#fa07cd"} title={"Idle"} />
        <Circle color={"#07fada"} title={"Over speeding"} />
      </Box>
      <Box>
        <Map />
      </Box>
    </Box>
  );
};

export default MapSection;
