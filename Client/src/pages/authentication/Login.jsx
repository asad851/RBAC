import React, { useState, useEffect } from "react";
import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { useFormik } from "formik";
import LeftAuthPagePanel from "../../Components/authentication/LeftAuthPagePanel.jsx";
import { useNavigate } from "react-router-dom";
import { useLoginUserApi } from "../../helper/apis/auth.js";
// import { REGISTER_PATH } from "../../Routes/route_names";
function Login() {
  const { handleLogin } = useLoginUserApi();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please Enter Your Email")
        .matches(
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
          "Invalid email address"
        ),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      await handleLogin(values);
    },
  });

  return (
    <div className="w-full h-full flex overflow-hidden  ">
      <LeftAuthPagePanel
        quote={` Unlock the potential of your people, and watch your business soar to
          new heights!`}
      />
      <div className="w-full h-full flex flex-col justify-center items-center max-[1100px]:justify-end bg-white border-l border-2 max-[1100px]:bg-transparent max-[1100px]:absolute  px-5 py-8 top-0 left-0">
        <div className="w-full rounded-lg flex flex-col items-center  mt-7 p-3 pt-5  max-[1100px]:h-[90%] max-[1100px]:w-[60%] min-w-[350px] max-[1100px]:bg-[rgba(255,255,255,0.7)] max-[1100px]:backdrop-blur-sm ">
          <Typography textAlign="center" variant="h1" className="text-gray-700">
            Welcome to RBAC UI
          </Typography>
          <div className="w-ful mt-8 ">
            <Typography
              textAlign="center"
              variant="body2bold"
              className="text-gray-600 text-center "
            >
              Enter Your email and password to signin
            </Typography>
          </div>

          <form
            className="w-full py-3 px-10 mt-3 flex flex-col gap-3"
            onSubmit={validation.handleSubmit}
          >
            <div className="w-full flex flex-col gap-2">
              <Typography className="text-gray-600" variant="body2bold">
                Email
              </Typography>
              <TextField
                required
                autoComplete="off"
                variant="filled"
                placeholder="Please provide your email"
                label="Email"
                fullWidth
                className="text-b4-size font-semibold"
                type="email"
                name="email"
                value={validation.values.email}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                error={
                  validation.touched.email && Boolean(validation.errors.email)
                }
                // helperText={validation.touched.email && validation.errors.email}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <Typography className="text-gray-600" variant="body2bold">
                Password
              </Typography>

              <FormControl
                required
                sx={{ width: "100%" }}
                error={
                  validation.touched.password &&
                  Boolean(validation.errors.password)
                }
                variant="filled"
              >
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <FilledInput
                  placeholder="Please provide your password"
                  id="filled-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={validation.values.password}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  className="[font-size:14px!important] font-[500!important]"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <div className="w-full flex justify-start mt-1">
                  <Button
                    type="button"
                    variant="text"
                    color="primary"
                    onClick={async () => {
                      // const res = await get("/invite");
                      // console.log(res);
                    }}
                  >
                    Forgot Password?
                  </Button>
                </div>
              </FormControl>
            </div>
            <Button
              className="mt-[20px!important]"
              sx={{ width: "100%" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign in
            </Button>
            {/* <div className="flex  items-center">
              <Typography variant="small1medium">
                don't have an account?
              </Typography>
              <Button
                type="button"
                variant="text"
                color="primary"
                onClick={() => {
                  navigate(REGISTER_PATH);
                }}
              >
                Register
              </Button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
