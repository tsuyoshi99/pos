import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { inject, observer } from "mobx-react";
import { useSnackbar } from "notistack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/router";
import {
  validateEmpty,
  validateEmail,
  validatePassword,
} from "core/validation";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://pos.hunvikran.com/">
        Hun Vikran POS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function LogIn(props) {
  const { login, setAuthenticatedUser } = props.authStore;
  const { errorMessage, getErrorMessage, addErrorMessage, removeErrorMessage } =
    props.errorMsgStore;
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const queueSnackbar = (message, options) => {
    enqueueSnackbar(message, {
      ...options,
      action: (key) => (
        <Button
          key={key}
          style={{ color: "white" }}
          size="small"
          onClick={() => closeSnackbar(key)}
        >
          CLOSE
        </Button>
      ),
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    if (values.email === "" || values.password === "") {
      queueSnackbar("Please fill in all fields", { variant: "error" });
      return false;
    }

    if (!validateEmail(values.email)) {
      queueSnackbar("Please enter a valid email address", {
        variant: "error",
      });
      return false;
    }

    // if (!validatePassword(values.password)) {
    //   enqueueSnackbar("Please enter a valid password", { variant: "error" });
    //   return false;
    // }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    queueSnackbar("Logging in...", { variant: "info" });
    // const data = new FormData(event.currentTarget);
    await login({
      email: values.email,
      password: values.password,
    })
      .then((result) => {
        // console.log(result.data);
        setAuthenticatedUser(result.data.data);
        queueSnackbar("Logged in successfully", { variant: "success" });
        router.push("/");
      })
      .catch((error) => {
        // console.log(error.response.data);
        if (error.response.data.error.description) {
          queueSnackbar(capitalize(error.response.data.error.description), {
            variant: "error",
          });
        } else {
          queueSnackbar(error.response.data.error.message, {
            variant: "error",
          });
        }
      });
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.substring(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          container
          alignItems="center"
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
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
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange("email")}
                sx={{ my: 2 }}
              />
              <FormControl fullWidth required variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default inject("authStore", "errorMsgStore")(observer(LogIn));
