import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { inject, observer } from "mobx-react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import {
  validateEmpty,
  validateEmail,
  validatePassword,
} from "core/validation";

function Register(props) {
  const { register } = props.authStore;
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
    queueSnackbar("Registering...", { variant: "info" });
    await register({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        queueSnackbar("Successfully registered", { variant: "success" });
        router.push("/login");
      })
      .catch((error) => {
        queueSnackbar(capitalize(error.response.data.error.description), {
          variant: "error",
        });
      });
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.substring(1);
  };

  return (
    <section className="relative flex flex-wrap h-screen lg:items-center">
      <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src="https://source.unsplash.com/random"
          alt=""
        />
      </div>

      <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Create New Account</h1>

          <p className="mt-4 text-gray-500">
            Brought to you by 2 ambitious individuals.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-8 mb-0 space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange("email")}
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type={values.showPassword ? "text" : "password"}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange("password")}
              />

              <span
                className="absolute inset-y-0 inline-flex items-center right-4 cursor-pointer"
                onClick={handleClickShowPassword}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Already have an account?
              <Link
                href="/login"
                className="text-blue-500 hover:text-blue-700 transition-colors duration-200 ease-in-out"
              >
                Login
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default inject("authStore")(observer(Register));
