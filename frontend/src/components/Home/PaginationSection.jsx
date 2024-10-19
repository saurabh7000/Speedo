import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllTrips } from "../../store/Actions/tripActions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaginationSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const { totalTrips,error } = useSelector((state) => state.allTrips);

  const totalPages = Math.ceil(totalTrips / 10) || 1; 

  useEffect(() => {
    if(error){
      toast.error("Something went wrong please try again!");
      dispatch(clearErrors())
      navigate("/")

    }
    dispatch(getAllTrips(page));
  }, [page, dispatch]);
  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem",
      }}
    >
      {totalPages > 1 ? (
        <Pagination
          count={totalPages}
          page={page}
          variant="outlined"
          color="primary"
          shape="rounded"
          onChange={(e, value) => setPage(value)}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default PaginationSection;
