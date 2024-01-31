import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";

import { styled } from "@mui/material/styles";
import { AccountCircle, Email } from "@mui/icons-material";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
const defaultTheme = createTheme();

export default function UserProfile() {
  const [user, setUser] = React.useState({});

  const { displayName } = user;
  const { email } = user;
  const { phoneNumber } = user;
  const { photoURL } = user;

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userdata = user.providerData[0];
        setUser(userdata);
      } else {
        // User is signed out
      }
    });
  }, []);

  const showToastMessage = (message) => {
    if (message === "Updated Successfully") {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: "Aqib Nawaz",
      photoURL: "https://avatars.githubusercontent.com/u/65488916?v=4",
      phoneNumber: "03334343430",
    })
      .then(() => {
        showToastMessage("Updated Successfully");
      })
      .catch((error) => {
        showToastMessage(error.message);
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} src={photoURL}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome, {displayName ? displayName : "User"}
        </Typography>
        <CssBaseline />
        <Paper
          elevation={24}
          component="form"
          onSubmit={(e) => handleUpdate(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid
            container
            width={"100%"}
            direction={"column"}
            alignContent="start"
            spacing={4}
            sx={{ marginBottom: "20px", marginTop: "20px", marginLeft: "0px" }}
          >
            <Grid item>Name : {displayName}</Grid>
            <Grid item>Email: {email}</Grid>
            <Grid item>Phone: {phoneNumber}</Grid>
            <Grid item>Photo Url: {photoURL}</Grid>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: 16,
  fontWeight: "bold",
  cursor: "pointer",
}));
