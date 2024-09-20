import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import sideimg from "../assets/Forgot.svg";
// import handShake from "../assets/hand-shake.png";
import axios from "axios";
import toast from "react-hot-toast";
import { BiLeftArrow, BiLeftArrowAlt } from "react-icons/bi";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/employees/reset-password",
        {
          email,
          username,
        }
      );

      const data = response.data;
      toast.success(data.message);

      setTimeout(() => {
        navigate("/changepwd");
      }, 3000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        console.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response received from server.");
        console.error(error.request);
      } else {
        toast.error(error.message);
        console.error(error.message);
      }
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

      <div className="w-1/2 max-lg:w-full items-center justify-center gap-5 flex flex-col overflow-scroll">
      <img src={logo} alt="logo-img" className="w-32 h-32 mx-auto mt-2" />

        <h1 className="text-2xl text-center text-[#444444] font-semibold mb-4">
          Reset Password
        </h1>

        <form
          // className="w-full xl:w-1/2 flex max-sm:w-full flex-col gap-4 px-20 max-lg:px-0 max-lg:items-center max-lg:justify-center xl:px-10"
          className="w-full flex flex-col items-center mt-8 lg:mt-0 gap-4"

          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
          <label
              htmlFor="username"
              className="font-semibold mb-1 text-2xl text-[#444444]"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-96 h-14 max-sm:w-full text-black px-2 py-2 sm:py-3 rounded-md border-gray-400 border-2 outline-none mb-4 text-xl"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-semibold text-[#444444] mb-1 text-2xl"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-96 text-xl h-14 text-black px-2 max-sm:w-full py-2 sm:py-3 rounded-md border-gray-400 border-2 outline-none mb-4"
            />
          </div>

          <button
            type="submit"
            className="bg-[#00B7FF] max-sm:w-fit max-sm:px-5 w-96 h-11 text-2xl font-semibold text-white rounded-md"
          >
            Reset
          </button>
          <div className="flex items-center max-sm:w-full justify-between mt-4 ">
            <Link
              to="/"
              className="cursor-pointer max-sm:w-full overflow-hidden font-semibold transition-all duration-300 ease-in-out flex flex-row items-center group text-2xl text-[#444444]"
            >
              <p className="w-full flex flex-row items-center max-sm:justify-center max-sm:w-full -translate-x-6 max-sm:translate-x-0 group-hover:translate-x-0 duration-200">
                <BiLeftArrowAlt className="max-sm:hidden"/>
                Back to Login
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
