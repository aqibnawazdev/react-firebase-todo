import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Facebook, Google } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [isResetLinkSent, setIsResetLinkSent] = React.useState(false);

  const navigate = useNavigate();
  const showToastMessage = (message) => {
    if (message === "Success, Check you email inbox") {
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
  const handleNavigate = () => {
    navigate("/login");
  };
  const handlePasswordReset = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then((n) => {
        console.log(n);
        showToastMessage("Success, Check you email inbox");
        setIsResetLinkSent(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showToastMessage(errorMessage);
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isResetLinkSent
              ? "Please Check you email to reset your password and comeback to signin"
              : "Reset Password"}
          </Typography>

          <ToastContainer />
          <Box
            component="form"
            onSubmit={(event) => handlePasswordReset(event)}
            noValidate
            sx={{ mt: 1 }}
          >
            {isResetLinkSent ? (
              ""
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Enter your reset email"
                type="email"
                id="email"
              />
            )}
            {isResetLinkSent ? (
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleNavigate}
              >
                Click to Signin
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Reset Link
              </Button>
            )}

            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
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
