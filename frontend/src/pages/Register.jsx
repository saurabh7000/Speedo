import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, registerUser } from "../store/Actions/userActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const mainContainerStyle = {
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(to bottom, #ccffcc, #99ccff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: { xs: "1rem", sm: "2rem", md: "5rem" },
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  width: { xs: "90%", sm: "40rem" },
  height: { xs: "auto", sm: "28rem" },
  padding: { xs: "2rem", sm: "5rem 2rem" },
  borderRadius: "5px",
  backgroundColor: "white",
};

const inputContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  width: "24rem",
};

const btnStyle = {
  textTransform: "none",
  color: "white",
  backgroundColor: "#141c33",
  padding: { xs: "0.6rem 4rem", sm: "0.6rem 10rem" },
  borderRadius: "10px",
  fontSize: "1.3rem",
  transition: "opacity 0.3s",
  "&:hover": {
    opacity: 0.8,
  },
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isRegistered } = useSelector((state) => state.register);

  const handleRegister = () => {
    dispatch(registerUser(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error("Error", error);
      dispatch(clearErrors());
      navigate("/register");
    }
    if (isRegistered) {
      toast.success("Register successfully !");
      navigate("/login");
    }
  }, [dispatch, toast, navigate, isRegistered, error]);

  return (
    <Box sx={mainContainerStyle}>
      <Box sx={containerStyle}>
        <img src={logo} alt="Logo" style={{ width: "15rem" }} />
        <Box sx={inputContainerStyle}>
          <Typography variant="subtitle1">Email</Typography>
          <TextField
            type="email"
            value={email}
            placeholder="Example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: "24rem",
          }}
        >
          <Typography variant="subtitle1">Password</Typography>
          <TextField
            type="password"
            value={password}
            placeholder="At least 8 characters"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          />
        </Box>
        <Button sx={btnStyle} onClick={handleRegister}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
