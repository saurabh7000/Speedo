import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, uploadTrip } from "../store/Actions/tripActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid gray",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "Center",
  justifyContent: "center",
  padding: "2rem",
};

const UploadModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tripName, setTripName] = useState("");
  const [tripDetail, setTripDetail] = useState(null);

  const { isTripCreated, error } = useSelector((state) => state.newTrip);

  const handleNameChange = (e) => {
    setTripName(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTripDetail(file);
    }
  };

  const handleUpload = (e) => {
    dispatch(uploadTrip(tripName, tripDetail));
    onClose();
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong.Please try again!", error);
      dispatch(clearErrors());
      navigate("/");
    }
    if (isTripCreated) {
      toast.success("Trip is uploaded successfully");
      window.location.reload();
    }
  }, [dispatch, error, isTripCreated, toast]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            fontSize: "1.8rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <IoMdClose onClick={onClose} />
        </Box>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "1.8rem",
          }}
        >
          <TextField
            type="text"
            placeholder="Trip Name*"
            value={tripName}
            sx={{ width: "100%", margin: "2rem" }}
            onChange={handleNameChange}
          />
          <TextField
            type="file"
            inputProps={{ accept: ".xlsx,.xls,.csv" }}
            sx={{ display: "none" }}
            onChange={handleFileChange}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              sx={{
                textTransform: "none",
                width: "100%",
                border: "2px solid #45aaed",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
              }}
              component="span"
            >
              <FiUpload
                style={{
                  fontSize: "2.5rem",
                  margin: "0.9rem 0.3rem 0.5rem 0.3rem",
                }}
              />
              <Typography sx={{ fontSize: "large" }}>
                Upload the
                <span
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  {" "}
                  Excel{" "}
                </span>
                sheet of your trip
              </Typography>
            </Button>
          </label>
          {tripDetail && (
            <Typography sx={{ marginTop: "1rem" }}>
              Selected file: {tripDetail.name}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              border: "1px solid black",
              borderRadius: "5px",
              fontSize: "1.2rem",
              color: "black",
              padding: "0.2rem 2.5rem 0.2rem 2.5rem",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: "none",
              border: "1px solid black",
              borderRadius: "5px",
              fontSize: "1.2rem",
              color: "white",
              backgroundColor: "#141c33",
              padding: "0.2rem 3rem 0.2rem 3rem",
            }}
            onClick={handleUpload}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadModal;
