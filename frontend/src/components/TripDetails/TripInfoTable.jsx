import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const infoTextBoxStyle = {
  width: "80%",
  margin: "1rem 0",
  display: "flex",
  alignItems: "center",
  justifyContent: { xs: "center", sm: "start" },
};
const tableCellSytle = {
  fontWeight: "bold",
  borderRight: "1px solid black",
  padding: { xs: "1rem 0.5rem", sm: "2rem 0.5rem" },
  borderBottom: "1px solid black",
  textAlign: "center",
};
const tableHeadCellStyle = {
  fontSize: { xs: "1rem", sm: "1.2rem" },
  borderRight: "1px solid black",
  textAlign: "center",
};

const TripInfoTable = ({
  trip,
  totalDistance,
  totalDuration,
  overSpeedDuration,
  stoppedDuration,
}) => {
  return (
    <>
      <TableContainer
        sx={{
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: { xs: "100%", sm: "75rem" },
          margin: "2rem 0",
          flexDirection: { xs: "column", sm: "row" },
          borderBottom: "none",
        }}
      >
        <Table>
          <TableHead sx={{ background: "whitesmoke" }}>
            <TableRow>
              <TableCell sx={tableHeadCellStyle}>Time</TableCell>
              <TableCell sx={tableHeadCellStyle}>Point</TableCell>
              <TableCell sx={tableHeadCellStyle}>Ignition</TableCell>
              <TableCell sx={tableHeadCellStyle}>Speed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trip &&
              trip.map((path, index) => {
                const { coordinate, speed, timestamp, ignition } = path;
                const dateTimeString = timestamp;
                const time = dateTimeString.split(" ")[1];
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ ...tableCellSytle }}>{time}</TableCell>
                    <TableCell sx={{ ...tableCellSytle }}>
                      {`${coordinate[0].latitudeB}, ${coordinate[0].longitudeB}`}
                    </TableCell>
                    <TableCell
                      sx={{
                        ...tableCellSytle,
                        color: ignition === "on" ? "#11f205" : "#f20511",
                      }}
                    >
                      {ignition === "on" ? "ON" : "OFF"}
                    </TableCell>
                    <TableCell
                      sx={{ ...tableCellSytle }}
                    >{`${speed} KM/H`}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Box
          sx={{
            width: { xs: "100%", sm: "50rem" },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "flex-start",
            borderBottom: "1px solid black",
            height: "auto",
          }}
        >
          <Box
            sx={{
              background: "whitesmoke",
              color: "whitesmoke",
              width: "100%",
              paddingBottom: "3.6rem",
            }}
          ></Box>
          <Box sx={infoTextBoxStyle}>
            <Typography sx={{ marginRight: "2rem" }}>
              Travel Duration
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
            >{`${totalDuration} Mins`}</Typography>
          </Box>
          <Box sx={infoTextBoxStyle}>
            <Typography sx={{ marginRight: "2rem" }}>Stopped from</Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
            >{`${stoppedDuration} Mins`}</Typography>
          </Box>
          <Box sx={infoTextBoxStyle}>
            <Typography sx={{ marginRight: "2rem" }}>Distance</Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
            >{`${totalDistance} KM/H`}</Typography>
          </Box>
          <Box sx={infoTextBoxStyle}>
            <Typography sx={{ marginRight: "2rem" }}>
              OverSpeeding Duration
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
            >{`${overSpeedDuration} Mins`}</Typography>
          </Box>
        </Box>
      </TableContainer>
    </>
  );
};

export default TripInfoTable;
