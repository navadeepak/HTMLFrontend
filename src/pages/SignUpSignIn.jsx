import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import sideimg from "../assets/login-right.png";
import sideimg from "../assets/login_img.svg";
import logo from "../assets/logo.svg";

// Toast
import toast from "react-hot-toast";

const SignUpSignIn = () => {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [role, setRole] = useState(\"Employee");
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [showWelcome, setShowWelcome] = useState(false);
  // const [showPasswordInstruction, setShowPasswordInstruction] = useState({
  //   length: false,
  //   specialChar: false,
  //   uppercase: false,
  // });
  

  const navigate = useNavigate();

  // const handlePasswordChange = (e) => {
  //   const newPassword = e.target.value;
  //   setPassword(newPassword);

  //   setShowPasswordInstruction({
  //     length:
  //       newPassword.length > 0 &&
  //       (newPassword.length < 8 || newPassword.length > 15),
  //     specialChar:
  //       newPassword.length > 0 && !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  //     uppercase: newPassword.length > 0 && !/[A-Z]/.test(newPassword),
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     toast.error("Passwords do not match");
  //     return;
  //   }

  //   fetch("http://localhost:3001/employees/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       username,
  //       email,
  //       password,
  //       confirmPassword,
  //       role,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === "ok") {
  //         toast.success(`User registered`);

  //         setTimeout(() => {
  //           setLoggedIn(true);
  //         }, 3000);
  //       } else if (data.error === "email_exists") {
  //         toast.error("Email already exists. Please use a different email.");
  //       } else {
  //         toast.error(data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error:", err);
  //       toast.error("Registration failed. Please try again.");
  //     });
  // };

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/employees/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        if (data.status === "ok") {
          toast.success("Login successful!");

          // Storing login infos in localstorage
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("user", JSON.stringify(data.user));

          navigate("/auth/dashboard");
        } else if (data.error === "user_not_found") {
          toast.error("User not found. Please check your credentials.");
        } else if (data.error === "incorrect_password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error(data.message || "Login failed");
        }
        setPassword("");
        setEmail("");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Login failed. Please try again.");
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full h-full overflow-hidden fixed top-0 left-0 bg-white">
      <div className="relative w-full h-full md:w-1/2 max-lg:hidden flex flex-col lg:mt-0 items-center justify-center">
        <div className="flex flex-col justify-center space-y-4 text-center relative">
          <img src={sideimg} className="" />
        </div>
      </div>

      <div className="w-1/2 max-lg:w-full items-center justify-center gap-5 h-full flex flex-col overflow-scroll">
        <img src={logo} alt="logo-img" className="w-32 h-32 mx-auto mt-2" />

        <h1 className="text-2xl text-center font-normal mb-4 text-[#444444] w-80">
          Welcome back! Please login to your account
        </h1>
        <form
          className="w-full flex flex-col items-center mt-8 lg:mt-0 gap-4"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col">
            <label
              htmlFor="login-email"
              className="font-semibold text-2xl mb-1 text-[#444444]"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="login-email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-96 h-14 text-black px-2 py-2 sm:py-3 rounded-md text-xl border-gray-400 border-2 outline-none mb-4"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="login-password"
              className="font-semibold text-2xl mb-1 text-[#444444]"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="login-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-96 h-14 text-black px-2 py-2 sm:py-3 border-2 text-xl rounded-md border-gray-400 outline-none mb-4"
            />
          </div>
          <div className="flex flex-col items-center w-96">
            <button
              type="submit"
              className="w-40 h-11 bg-[#00B7FF] text-white text-2xl font-semibold px-4 rounded-md "
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="flex w-full items-center justify-center mt-4 ">
              <Link
                to={"/reset"}
                className="cursor-pointer font-semibold text-2xl text-[#444444]"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpSignIn;
