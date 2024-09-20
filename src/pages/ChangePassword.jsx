import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.svg";
import sideimg from "../assets/Forgot.svg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BiLeftArrowAlt } from "react-icons/bi";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!validatePassword(newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/employees/change-password",
        {
          email,
          newPassword,
          confirmPassword,
        }
      );

      toast.success(response.data.message); // Show success message
      setTimeout(() => {
        navigate("/"); // Navigate to /auth after 3 seconds
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal server error.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full overflow-hidden fixed top-0 left-0 bg-white">
      <div className="relative w-full md:w-1/2 max-lg:hidden flex flex-col lg:mt-0">
        <div className="flex flex-col justify-center space-y-4 text-center h-full">
          <div className=" w-full flex justify-center overflow-hidden">
            <img src={sideimg} />
          </div>
        </div>
      </div>

      <div className="w-1/2 max-lg:w-full max-md:h-full items-center justify-center max-md:justify-normal gap-5 flex flex-col overflow-scroll">
        <img src={logo} alt="logo-img" className="w-32 h-32 mb-4" />

        <h1 className="text-2xl text-center text-[#444444] font-semibold mb-4">
          Change Password
        </h1>

        <form
          className="w-full xl:w-1/2 max-sm:w-full flex flex-col gap-4 px-20 max-lg:px-0 items-center max-lg:justify-center xl:px-10"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col max-sm:w-full">
          <label
              className="font-medium mb-1 text-sm sm:text-base"
              htmlFor="email"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-96 max-sm:w-full h-14 text-black px-2 py-2 sm:py-3 rounded-md border-gray-400 border-2 outline-none mb-4 text-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col max-sm:w-full">
            <label
              className="font-medium mb-1 text-sm sm:text-base"
              htmlFor="newPassword"
            >
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-96 h-14 text-black px-2 py-2 max-sm:w-full sm:py-3 rounded-md border-gray-400 border-2 outline-none mb-4 text-xl"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div className="flex flex-col max-sm:w-full">
            <label
              className="font-medium mb-1 text-sm sm:text-base"
              htmlFor="confirmPassword"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-96 h-14 text-black px-2 max-sm:w-full py-2 sm:py-3 rounded-md border-gray-400 border-2 outline-none mb-4 text-xl"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#00B7FF] w-96 h-11 text-2xl max-sm:w-full font-semibold text-white rounded-md"
          >
            Change Password
          </button>
          <div className="flex items-center justify-between mt-4 max-sm:w-full">
            <Link
              to="/"
              className="cursor-pointer overflow-hidden font-semibold transition-all duration-300 ease-in-out flex flex-row items-center group text-2xl text-[#444444]"
            >
              <p className="w-full flex flex-row items-center -translate-x-6 group-hover:translate-x-0 duration-200">
                <BiLeftArrowAlt />
                Back to Login
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
