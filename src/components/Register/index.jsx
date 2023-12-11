import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import { BASE_URL } from "../../services/api/BASE_URL";
import { loginSchema } from "../../validation/loginValidation";
import { Snackbar } from "@mui/material";
import { UserContext } from "../../services/context/UsersContext";
import Swal from "sweetalert2";
import { Col, Row } from "antd";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const { users, setUsers } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     setCurrentUsername("");
  //     setCurrentFullName("");
  //     setEmail("");
  //     setPassword("");
  //     try {
  //       const response = await fetch(
  //         "https://656dfda1bcc5618d3c245df9.mockapi.io/Users",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             username: currentUsername,
  //             fullName: currentFullName,
  //             email: email,
  //             password: password,
  //             isAdmin: isAdmin,
  //           }),
  //         }
  //       );

  //       if (response.ok) {
  //         alert("qeydiuyyatdan kecdiniz");
  //       } else {
  //         console.error("Failed to submit the form:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error.message);
  //     }
  //   };

  const formik = useFormik({
    initialValues: {
      currentUsername: "",
      FullName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const existingUserResponse = await fetch(
          `${BASE_URL}/Users?username=${values.currentUsername}&email=${values.email}`
        );

        if (existingUserResponse.ok) {
          const existingUsers = await existingUserResponse.json();

          if (existingUsers.length > 0) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "This account is already available",
            });
            return;
          } else {
            actions.resetForm();
          }
        } else {
          console.error("Error:", existingUserResponse.statusText);
          return;
        }

        const response = await fetch(
          "https://656dfda1bcc5618d3c245df9.mockapi.io/Users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.currentUsername,
              fullName: values.FullName,
              email: values.email,
              password: values.password,
              isAdmin: isAdmin,
            }),
          }
        );
        setTimeout(() => {
          if (response.ok) {
            setSuccessMessage("Register successfully!");
            handleClick();
          } else {
            alert("PROBLEM VAR BRAT");
          }
        }, 1000);
      } catch (error) {
        console.error("PROBLEM VAR BRAT", error);
      }
    },
    validationSchema: loginSchema,
  });

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <ThemeProvider theme={defaultTheme}>
        <Container
          style={{
            margin: "80px auto",
          }}
          component="main"
          maxWidth="xs"
        >
          <CssBaseline />
          <Row>
            <Col span={12}>
              <img
                style={{
                  width: "100%",
                }}
                src="https://cdn.dribbble.com/users/37937/screenshots/4287886/media/6183740f0c2b3bbf083c8b7391973e1d.gif"
                alt=""
              />
            </Col>
            <Col span={12}>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "60%",
                  margin: "0 auto",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={formik.handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="currentUsername"
                        required
                        fullWidth
                        id="currentUsername"
                        label="Username"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.currentUsername}
                        error={
                          formik.touched.currentUsername &&
                          formik.errors.currentUsername
                        }
                        helperText={
                          formik.touched.currentUsername &&
                          formik.errors.currentUsername
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-FullName"
                        name="FullName"
                        required
                        fullWidth
                        id="FullName"
                        label="FullName"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.FullName}
                        error={
                          formik.touched.FullName && formik.errors.FullName
                        }
                        helperText={
                          formik.touched.FullName && formik.errors.FullName
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={
                          formik.touched.password && formik.errors.password
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isAdmin}
                            onChange={() => setisAdmin(!isAdmin)}
                          />
                        }
                        label="isAdmin?"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Link to="/Login">
                      <Grid>Already have an account? Sign in</Grid>
                    </Link>
                  </Grid>
                </Box>
              </Box>
            </Col>
          </Row>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
