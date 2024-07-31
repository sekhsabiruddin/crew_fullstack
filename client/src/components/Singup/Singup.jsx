import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { toast } from "react-toastify";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (validator.isEmpty(username)) {
      toast.error("Username is required.");
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        `${server}/user/create-user`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      setUsername("");
      setEmail("");
      setPassword("");

      toast.success("User created successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error("Failed to create user. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gradient-to-b from-customWhite to-customPurple h-screen w-screen flex justify-center">
      <div className="bg-gradient-to-b from-[#F7F7F7] to-[#F0F0F0] border border-[#CECECE] rounded-[5px] w-[40%] h-[70%] mt-10">
        <div className="flex flex-col gap-5 p-4">
          <div>
            <h1 className="font-barlow font-semibold text-[2rem] text-center text-[#2D2D2D]">
              Welcome to <span className="text-[#4534AC]">Workflo!</span>
            </h1>
          </div>
          <div className="">
            <input
              type="text"
              placeholder="Full name"
              className="input-css"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
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
            className="w-full text-center sing-up-color cursor-pointer "
            onClick={handleSubmit}
          >
            <button className="text-[#ffff]">Sign up</button>
          </div>

          <div className="text-center">
            <p className="font-inter font-normal text-[18px] text-[#606060]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#0054A1] cursor-pointer">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
