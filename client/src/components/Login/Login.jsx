import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { toast } from "react-toastify";
import validator from "validator";
import { getUser } from "../../redux/reducer/auth";
import { server } from "../../server";
import { useDispatch } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    console.log("Api is");
    try {
      const response = await axios.post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(getUser());
      navigate("/task");
      toast.success("Logged in successfully!");
    } catch (err) {
      console.error("Error logging in:", err);
      toast.error(
        "Failed to log in. Please check your credentials and try again."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gradient-to-b from-customWhite to-customPurple h-screen w-screen flex justify-center">
      <div className="bg-gradient-to-b from-[#F7F7F7] to-[#F0F0F0] border border-[#CECECE] rounded-[5px] w-[40%] h-[60%] mt-10">
        <div className="flex flex-col gap-5 p-4">
          <div>
            <h1 className="font-barlow font-semibold text-[2rem] text-center text-[#2D2D2D]">
              Welcome to <span className="text-[#4534AC]">Workflo!</span>
            </h1>
          </div>
          <div className="">
            <input
              type="text"
              placeholder="Your Email"
              className="input-css"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-css"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VscEyeClosed /> : <VscEye />}
            </span>
          </div>
          <div
            className="w-full text-center deep_purple_600_indigo_200_border cursor-pointer"
            onClick={handleSubmit}
          >
            <button className="text-[#ffff]">Login</button>
          </div>

          <div className="text-center">
            <p className="font-inter text-[18px] text-[#606060] cursor-pointer">
              Don’t have an account ? create a{" "}
              <Link to="/" className="text-[#0054A1] ">
                new account ?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
