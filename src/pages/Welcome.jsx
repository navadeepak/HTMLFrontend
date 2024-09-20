import React from "react";
import logo from "../assets/logo.svg";
import { BsArrowRight } from "react-icons/bs";
import "../Components/custom css/welcome.css";
import "../Components/custom css/colors.css";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center fixed top-0 left-0 ">
      <div className="flex flex-col items-center justify-center w-[300px] h-[250px] text-center">
        <img src={logo} alt="" className="w-36 h-36" />
        <p className="font-medium text-lg">
          Enhancing Your Technological Endeverous
        </p>
      </div>
      <p className="text-5xl font-extralight">Welcome To</p>
      <h1 className="colorChangeBg text-8xl font-light">Quantum HR Connect</h1>
      <Link
        to={"/auth/dashboard"}
        className="flex flex-row items-center justify-evenly gap-5 text-2xl border-b-2 border-b-[--common-color] text-[--common-color]"
      >
        <p>Get Start</p>
        <BsArrowRight />
      </Link>
    </div>
  );
}

export default Welcome;
