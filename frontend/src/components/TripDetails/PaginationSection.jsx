import { Box, Pagination } from "@mui/material";
import React from "react";

const PaginationSection = ({ currPage, setCurrPage, tripLength }) => {
  const totalPages = Math.ceil(tripLength / 10);


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem",
      }}
    >
      <Pagination
        count={totalPages}
        page={currPage}
        variant="outlined"
        color="primary"
        shape="rounded"
        onChange={(e, value) => setCurrPage(value)}
      />
    </Box>
  );
};

export default PaginationSection;
