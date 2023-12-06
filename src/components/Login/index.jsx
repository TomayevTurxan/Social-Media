import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAllUsers } from "../../services/api/user";
import { UserContext } from "../../services/context/UsersContext";
import { Link, useNavigate } from "react-router-dom";
import { UserContextItem } from "../../services/context/UserContext";

function Login() {
  const navigate = useNavigate();
  let { users, setUsers } = useContext(UserContext);
  let {user,setUser} = useContext(UserContextItem)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res);
    });
  }, [setUsers]);
  console.log("users", users);

  const handleLogin = () => {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    console.log("founduser", foundUser);
    if (foundUser) {
      alert("XOS GELDINIZ " + foundUser.username);
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);

      navigate("/user/Home");
    } else {
      setError("BELE BIR ISTTIFADECI YOXDUR.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
    setUsername("");
    setPassword("");
  };

  return (
    <ThemeProvider theme={createTheme()}>
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                Forgot password?
              </Grid>
              <Link to="/register">
                <Grid item>{"Don't have an account? Sign Up"}</Grid>
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
