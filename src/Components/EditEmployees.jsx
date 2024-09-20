import React, { useCallback, useEffect, useState } from "react";
import axios from "./utilities/axiosInstance";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";
import { useEmployeeContext } from "../context/EmployeeContext";
import { useNavigate, useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Done } from "@mui/icons-material";
import { BsCameraFill } from "react-icons/bs";
import { Button } from "@mui/material";

function AddnewEmp() {
  const { employee_ID } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    work_role: "",
    status: "",
    team: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    personalEmail: "",
    currentAddress: "",
    emergencyContactNumber: "",
    phoneNumber: "",
    secondaryPhoneNumber: "",
    permanentAddress: "",
    hireDate: "",
    manager: "",
    username: "",
    email: "",
    password: "",
    role: "",
    bank: {
      name: "",
      accountNumber: "",
      ifscCode: "",
      branch: "",
      bankName: "",
    },
  });

  const { oneEmp } = useEmployeeContext();
  const [previewSource, setPreviewSource] = useState("");
  const id=useParams()
  const navigate=useNavigate();
  // console.log(id.employee_ID);


  

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/${employee_ID}`
        );
        const data = response.data;
        console.log(data);
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching user tasks:", error.message);
      }
    };

    if (employee_ID) {
      fetchUserRole();
    }
  }, [employee_ID]);


  useEffect(()=>{
    console.log(employee);
    
  },[employee])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in employee.bank) {
      setEmployee((prevState) => ({
        ...prevState,
        bank: {
          ...prevState.bank,
          [name]: value,
        },
      }));
    } else {
      setEmployee((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }    
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };



  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result); // Preview the image
      };
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  // useEffect(() => {
   
  //   if(employee){
  //     console.log(employee.birthDate);
  //     console.log(employee.hireDate);
  //     setEmployee((prevEmployee) => ({
  //       ...prevEmployee,
  //       birthdate: "2024-09-21",
  //       hireDate: "2023-08-04",
  //     }));
  //   }
  // }, [employee]);

  const validateField = (employee) => {
    const newErrors = {};

    if (!employee.hireDate) newErrors.hireDate = "Hire date is required";
    if (!employee.team) newErrors.team = "Team is required";
    if (!employee.manager) newErrors.manager = "Manager is required";
    if (!employee.work_role) newErrors.work_role = "Designation is required";
    if (!employee.name) newErrors.name = "Full name is required";
    if (!employee.gender) newErrors.gender = "Gender is required";
    // if (!birthDate) newErrors.birthDate = "Birth date is required";
    if (!employee.birthdate) {
      newErrors.birthDate = "Birth date is required";
    } else if (employee.birthdate) {
      var EntredYear = new Date(employee.birthdate);
      var Eyear = EntredYear.getFullYear();
      var CurrentYear = new Date();
      var Cyear = CurrentYear.getFullYear();
      //console.log(Eyear, Cyear);
      if (Eyear === Cyear) {
        newErrors.birthDate =
          "Invalid birth date 'current year and entred year are same'";
      } else if (Eyear + 18 > Cyear) {
        newErrors.birthDate = "Invalid birth date 'Above 18 is eligible' ";
      }
    }
    if (!employee.maritalStatus)
      newErrors.maritalStatus = "Marital status is required";
    if (!employee.nationality)
      newErrors.nationality = "Nationality is required";
    if (!employee.username) newErrors.username = "username is required   ";
    if (!employee.status) newErrors.status = "Status is required";

    if (!employee.role) newErrors.role = "Role is required";
    if (!employee.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(employee.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!employee.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(employee.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    if (!employee.personalEmail) {
      newErrors.personalEmail = "Personal email is required";
    } else if (!validateEmail(employee.personalEmail)) {
      newErrors.personalEmail = "Invalid personal email address";
    }
    if (!employee.emergencyContactNumber) {
      newErrors.emergencyContactNumber = "Emergency phone number is required";
    } else if (!validatePhoneNumber(employee.emergencyContactNumber)) {
      newErrors.emergencyContactNumber = "Invalid Emergency phone number";
    }
    // if (!employee.password) {
    //   newErrors.password = "Password is required";
    // } else if (!validatePassword(employee.password)) {
    //   newErrors.password = "Invalid password";
    // } 
    if (!employee.currentAddress)
      newErrors.currentAddress = "Current address is required";
    if (!employee.permanentAddress)
      newErrors.permanentAddress = "Permanent address is required";
    if (!employee.emergencyContactNumber)
      newErrors.emergencyContactNumber = "Emergency contact number is required";
 
    if (!employee.bank.name) newErrors.ACName = "Name is required";
    if (!employee.bank.accountNumber)
      newErrors.accountNumber = "accountNumber is required";
    if (!employee.bank.ifscCode) newErrors.ifscCode = "IFSC Code is required";
    if (!employee.bank.branch) newErrors.branch = "Branch is required";
    if (!employee.bank.bankName) newErrors.bankName = "Bank Name is required";
    // if (!employee.bank.img) newErrors.img = "Passbook Image is required";
    setErrors(newErrors);
    // console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const formateddate = (e) => {
    const date = new Date(e);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    const format = `${year}-${month}-${day}`; 
    return format;
  };
  
  const [errors, setErrors] = useState({});

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleEditEmp = async (employee) => {
    if (!validateField(employee)) {
      return;
    }
  
    // console.log("Updated value");
  
    // Prepare JSON data
    const employeeData = {
      name: employee.name,
      work_role: employee.work_role,
      status: employee.status,
      team: employee.team,
      birthdate: employee.birthdate,
      gender: employee.gender,
      maritalStatus: employee.maritalStatus,
      nationality: employee.nationality,
      personalEmail: employee.personalEmail,
      currentAddress: employee.currentAddress,
      emergencyContactNumber: employee.emergencyContactNumber,
      phoneNumber: employee.phoneNumber,
      secondaryPhoneNumber: employee.secondaryPhoneNumber,
      permanentAddress: employee.permanentAddress,
      hireDate: employee.hireDate,
      manager: employee.manager,
      role: employee.role,
      bank: {
        name:employee.bank.name,
        accountNumber: employee.bank.accountNumber,
        ifscCode: employee.bank.ifscCode,
        branch:employee.bank.branch,
        bankName:employee.bank.bankName,
        }
    };  
    try {
      const result = await axios.patch(
        `http://localhost:3001/employees/edit/${id.employee_ID}`,
        employeeData, // Send JSON data here
        {
          headers: {
            "Content-Type": "application/json", // Set header to application/json
          },
        }
      );
      // console.log(result);
      toast.success("Edited employee successfully");
      navigate("/auth/employee");
    } catch (err) {
      console.error(err);
      toast.error("Can't edit Employee");
    }
  };
  

 


  return (
    // -----------------------Component Main div---------------------------------
    <div className="mt-10 h-fit flex flex-col items-center gap-5">
      <div className="w-full flex items-center flex-col gap-5">
        <p className="text-3xl font-semibold text-[#444444]">
          Edit Employee
        </p>
        {/* <p className="text-gray-500 text-xl">Create New Contact for Employee</p> */}
      </div>
      <div className="w-full flex flex-col items-center p-5">
        <div className="w-full shadow-[0_0_5px_0] shadow-gray-300 rounded-xl">
          <header className="w-full flex items-center justify-between p-5 bg-[#efefef] rounded-t-xl">
            <p className="text-2xl font-medium text-[#444444]">
              Personal Information
            </p>
            <p className="w-6 h-6 ring-[--common-color] text-[--common-color] ring-2 hidden items-center justify-center rounded-full">
              1
            </p>
            <p className="w-6 h-6 bg-[--common-color] text-white flex items-center justify-center rounded-full">
              <Done className="p-1" />
            </p>
          </header>
          <div className="flex flex-row max-lg:flex-col p-16 max-lg:p-5 gap-20">
            <div className="flex flex-col gap-20 items-center">
              <div className={`relative w-52 h-52`}>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  required
                />
                {previewSource && (
                  <img
                    src={previewSource}
                    alt="Preview"
                    className="object-cover shadow-md ring-1 ring-gray-300 w-full h-full rounded-full"
                  />
                )}
                {!previewSource && (
                  <div className="bg-gray-200 text-gray-400 flex items-center justify-center w-full h-full rounded-full">
                    <span className="text-center">
                      <BsCameraFill className="h-full w-full text-8xl" />
                    </span>
                  </div>
                )}
              </div>
              <button className="h-14 w-52 bg-[--common-color] text-white text-2xl rounded-lg font-semibold">
                Edit
              </button>
            </div>
            <div className="grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-[#444444] font-medium text-lg"
                >
                  Name
                </label>
                <input
                  name="name"
                  value={employee.name}
                  onChange={handleInputChange1}
                  type="text"
                  placeholder="Enter Name"
                  className={`shadow-[0_0_5px_0] shadow-gray-300 h-14 rounded-md px-5 font-medium text-lg text-[#444444] ${
                    errors.name ? "!border-red-500 border-2" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="birthDate"
                  className="text-[#444444] font-medium text-lg"
                >
                  Birth Date
                </label>
                <div
                  className={`shadow-[0_0_5px_0] shadow-gray-300 h-14 rounded-md px-5 placeholder  ${
                    errors.birthDate ? "!border-red-500 border-2" : ""
                  }`}
                >
                  {/* {console.log(employee.birthdate)} */}
                  <input
                    name="birthdate"
                    value={formateddate(employee.birthdate)}
                    onChange={handleInputChange1}
                    type="date"
                    className={`w-full h-full outline-none font-medium text-lg text-[#444444]`}
                  />
                  {errors.birthDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.birthDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="gender"
                  className="text-[#444444] font-medium text-lg"
                >
                  Gender
                </label>
                <div
                  className={`flex flex-row gap-20 max-xl:gap-2 max-xl:px-2 h-14 items-center justify-between px-10 w-full font-medium text-lg text-[#444444]  ${
                    errors.gender ? "!border-red-500 border-2" : ""
                  }`}
                >
                  <div className="h-full flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={employee.gender === "Male"}
                      onChange={handleInputChange1}
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="h-full flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={employee.gender === "Female"}
                      onChange={handleInputChange1}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="maritalStatus"
                  className="text-[#444444] font-medium text-lg"
                >
                  Marital Status
                </label>
                <div
                  className={`flex flex-row gap-20 max-xl:gap-2 max-xl:px-2 h-14 items-center justify-between px-10 w-full font-medium text-lg text-[#444444]  ${
                    errors.maritalStatus ? "!border-red-500 border-2" : ""
                  }`}
                >
                  <div className="h-full flex items-center gap-2">
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="Married"
                      checked={employee.maritalStatus === "Married"}
                      onChange={handleInputChange1}
                    />
                    <label htmlFor="married">Married</label>
                  </div>

                  <div className="h-full flex items-center gap-2">
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="Single"
                      checked={employee.maritalStatus === "Single"}
                      onChange={handleInputChange1}
                    />
                    <label htmlFor="single">Single</label>
                  </div>
                </div>
                {errors.maritalStatus && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.maritalStatus}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="nationality"
                  className="text-[#444444] font-medium text-lg"
                >
                  Nationality
                </label>
                <input
                  name="nationality"
                  value={employee.nationality}
                  onChange={handleInputChange1}
                  type="text"
                  placeholder="Enter Nationality"
                  className={`shadow-[0_0_5px_0] shadow-gray-300 h-14 rounded-md px-5 font-medium text-lg text-[#444444]  ${
                    errors.nationality ? "!border-red-500 border-2" : ""
                  }`}
                />
                {errors.nationality && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nationality}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full gap-2">
                <label
                  htmlFor="work_role"
                  className="text-[#444444] font-medium text-lg"
                >
                  Designation
                </label>
                <div
                  className={`shadow-[0_0_5px_0] shadow-gray-300 h-14 rounded-md px-5  ${
                    errors.work_role ? "!border-red-500 border-2" : ""
                  }`}
                >
                  <select
                    name="work_role"
                    value={employee.work_role}
                    onChange={handleInputChange1}
                    className="h-14 bg-white flex w-full outline-none font-medium text-lg text-[#444444]"
                  >
                    <option value="">Select Designation</option>
                    <option value="Full-stack Node.JS / React.js Developer">
                      Full-stack Node.JS / React.js Developer
                    </option>
                    <option value="Mobile Application Developer">
                      Mobile Application Developer
                    </option>
                    <option value="Embedded Engineer">Embedded Engineer</option>
                    <option value="AI / ML Engineer">AI / ML Engineer</option>
                    <option value="Cloud Engineer">Cloud Engineer</option>
                    <option value="Intern Full-stack Node.js / React.js Developer">
                      Intern Full-stack Node.js / React.js Developer
                    </option>
                    <option value="Intern Mobile Application Developer Trainee">
                      Intern Mobile Application Developer Trainee
                    </option>
                    <option value="Intern Embedded Engineer trainee">
                      Intern Embedded Engineer trainee
                    </option>
                    <option value="Intern AI / ML Trainee">
                      Intern AI / ML Trainee
                    </option>
                    <option value="Intern Cloud Engineer Trainee">
                      Intern Cloud Engineer Trainee
                    </option>
                  </select>
                  {errors.work_role && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.work_role}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="team"
                  className="text-[#444444] font-medium text-lg"
                >
                  Team
                </label>
                <div
                  className={`shadow-[0_0_5px_0] shadow-gray-300 h-14 rounded-md px-5 font-medium text-lg text-[#444444] ${
                    errors.team ? "!border-red-500 border-2" : ""
                  }`}
                >
                  <select
                    name="team"
                    value={employee.team}
                    onChange={handleInputChange1}
                    className="h-14 bg-white flex w-full outline-none"
                  >
                    <option value="">Select Team</option>
                    <option value="Design">Design</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Testing">Testing</option>
                  </select>
                  {errors.team && (
                    <p className="text-red-500 text-xs mt-1">{errors.team}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="manager"
                  className="text-[#444444] font-medium text-lg"
                >
                  Manager
                </label>
                <input
                  name="manager"
                  value={employee.manager}
                  onChange={handleInputChange1}
                  type="text"
                  placeholder="Enter Manager"
                  className={`w-full h-14 shadow-[0_0_5px_0] shadow-gray-300 rounded-md px-5 font-medium text-lg text-[#444444]  ${
                    errors.manager ? "!border-red-500 border-2" : ""
                  }`}
                />
                {errors.manager && (
                  <p className="text-red-500 text-xs mt-1">{errors.manager}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="hireDate"
                  className="text-[#444444] font-medium text-lg"
                >
                  Join Date
                </label>
                <div
                  className={`shadow-[0_0_5px_0] shadow-gray-300 h-14 rounded-md px-5  ${
                    errors.hireDate ? "!border-red-500 border-2" : ""
                  }`}
                >
                  <input
                    name="hireDate"
                    value={formateddate(employee.hireDate)}
                    onChange={handleInputChange1}
                    type="date"
                    className={`w-full h-full outline-none font-medium text-lg text-[#444444]`}
                  />
                  {errors.hireDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.hireDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="username"
                  className="text-[#444444] font-medium text-lg"
                >
                  User Name
                </label>
                <div
                  className={`shadow-[0_0_5px_0] shadow-gray-300 h-14 rounded-md px-5  ${
                    errors.username ? "!border-red-500 border-2" : ""
                  }`}
                >
                  <input
                    name="username"
                    value={employee.username}
                    onChange={handleInputChange1}
                    type="text"
                    className="w-full h-full outline-none font-medium text-lg text-gray-400"
                    readOnly
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="status"
                  className="text-[#444444] font-medium text-lg"
                >
                  Status
                </label>
                <div
                  className={`shadow-[0_0_5px_0] shadow-gray-300 h-14 rounded-md px-5  ${
                    errors.status ? "!border-red-500 border-2" : ""
                  }`}
                >
                  <select
                    name="status"
                    value={employee.status}
                    onChange={handleInputChange1}
                    className="h-14 bg-white flex w-full outline-none font-medium text-lg text-[#444444]"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center p-5">
        <div className="w-full shadow-[0_0_5px_0] shadow-gray-300 rounded-xl">
          <header className="w-full flex items-center justify-between p-5 bg-[#efefef] rounded-t-xl">
            <p className="text-2xl font-medium text-[#444444]">
              Contact Information
            </p>
            <p className="w-6 h-6 ring-[--common-color] text-[--common-color] ring-2 hidden items-center justify-center rounded-full">
              1
            </p>
            <p className="w-6 h-6 bg-[--common-color] text-white flex items-center justify-center rounded-full">
              <Done className="p-1" />
            </p>
          </header>
          <div className="flex p-16 max-lg:p-5 gap-20">
            <div className="grid grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2 place-content-between justify-between w-full gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-[#444444] font-medium text-lg"
                >
                  E-mail
                </label>
                <input
                  name="email"
                  value={employee.email}
                  onChange={handleInputChange1}
                  type="text"
                  placeholder="Enter Email"
                  className={`shadow-[0_0_5px_0] shadow-gray-300 h-14 rounded-md px-5 font-medium text-lg text-gray-400  ${
                    errors.email ? "!border-red-500 border-2" : ""
                  }`}
                  readOnly
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="personalEmail"
                  className="text-[#444444] font-medium text-lg"
                >
                  Personal E-mail
                </label>
                <input
                  name="personalEmail"
                  value={employee.personalEmail}
                  onChange={handleInputChange1}
                  type="text"
                  placeholder="Enter Personal Email"
                  className={`shadow-[0_0_5px_0] shadow-gray-300 w-full h-14 rounded-md px-5 font-medium text-lg text-[#444444] ${
                    errors.personalEmail ? "!border-red-500 border-2" : ""
                  }`}
                />
                {errors.personalEmail && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.personalEmail}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phoneNumber"
                  className="text-[#444444] font-medium text-lg"
                >
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  value={employee.phoneNumber}
                  onChange={handleInputChange1}
                  type="number"
                  className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444] ${
                    errors.phoneNumber ? "!border-red-500 border-2" : ""
                  }`}
                  placeholder="Phone number"
                  required
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="secondaryPhoneNumber"
                  className="text-[#444444] font-medium text-lg"
                >
                  Secondary Phone Number
                </label>
                <input
                  name="secondaryPhoneNumber"
                  value={employee.secondaryPhoneNumber}
                  onChange={handleInputChange1}
                  type="number"
                  className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444] ${
                    errors.secondaryPhoneNumber
                      ? "!border-red-500 border-2"
                      : ""
                  }`}
                  placeholder="Secondary phone number (optional)"
                  required
                />
                {errors.secondaryPhoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.secondaryPhoneNumber}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="currentAddress"
                  className="text-[#444444] font-medium text-lg"
                >
                  Current Address
                </label>
                <input
                  name="currentAddress"
                  value={employee.currentAddress}
                  onChange={handleInputChange1}
                  type="text"
                  className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444] ${
                    errors.currentAddress ? "!border-red-500 border-2" : ""
                  }`}
                  placeholder="Current address"
                  required
                />
                {errors.currentAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.currentAddress}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full gap-2">
                <label
                  htmlFor="permanentAddress"
                  className="text-[#444444] font-medium text-lg"
                >
                  Permanent Address
                </label>
                <input
                  name="permanentAddress"
                  value={employee.permanentAddress}
                  onChange={handleInputChange1}
                  type="text"
                  className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444] ${
                    errors.permanentAddress ? "!border-red-500 border-2" : ""
                  }`}
                  placeholder="Permanent address"
                  required
                />
                {errors.permanentAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.permanentAddress}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="emergencyContactNumber"
                  className="text-[#444444] font-medium text-lg"
                >
                  Emergency Contact Number
                </label>
                <input
                  name="emergencyContactNumber"
                  value={employee.emergencyContactNumber}
                  onChange={handleInputChange1}
                  type="number"
                  className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444] ${
                    errors.emergencyContactNumber
                      ? "!border-red-500 border-2"
                      : ""
                  }`}
                  placeholder="Emergency contact number"
                  required
                />
                {errors.emergencyContactNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emergencyContactNumber}
                  </p>
                )}
              </div>

              {/* <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-[#444444] font-medium text-lg"
                >
                  Password
                </label>
                <input
                  name="password"
                  value={employee.password}
                  // onChange={handleInputChange1}
                  type="password"
                  className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444] ${
                    errors.password ? "!border-red-500 border-2" : ""
                  }`}
                  placeholder="Password to login"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div> */}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="role"
                  className="text-[#444444] font-medium text-lg"
                >
                  Role
                </label>
                <div
                  className={`shadow-[0_0_5px_0] shadow-gray-300 h-14 rounded-md px-5${
                    errors.role ? " !border-red-500 border-2" : ""
                  }`}
                >
                  <select
                    name="role"
                    value={employee.role}
                    onChange={handleInputChange1}
                    className={`h-full w-full bg-white rounded-md border-transparent border-2 font-medium text-lg text-[#444444] outline-none `}
                  >
                    <option value="">Select Role</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center p-5">
        <div className="w-full shadow-[0_0_5px_0] shadow-gray-300 rounded-xl">
          <header className="w-full flex items-center justify-between p-5 bg-[#efefef] rounded-t-xl">
            <p className="text-2xl font-medium text-[#444444]">
              Bank Details Information
            </p>
            <p className="w-6 h-6 ring-[--common-color] text-[--common-color] ring-2 hidden items-center justify-center rounded-full">
              1
            </p>
            <p className="w-6 h-6 bg-[--common-color] text-white flex items-center justify-center rounded-full">
              <Done className="p-1" />
            </p>
          </header>
          <div className="flex flex-col">
            <div className=" w-full flex flex-row max-lg:flex-col max-lg:border-none border-b-2">
              <div className="w-1/2 max-lg:w-full max-lg:border-none h-full border-r p-5 gap-5 max-lg:grid max-lg:grid-cols-2 max-md:flex flex flex-col">
                <div className="flex flex-col w-full gap-2">
                  <label
                    htmlFor="name"
                    className="text-[#444444] font-medium text-lg"
                  >
                    Name (as per Passbook)
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                    value={employee.bank.name}
                    onChange={handleInputChange}
                    className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444]  ${
                      errors.ACName ? "!border-red-500 border-2" : ""
                    }`}
                  />
                  {errors.ACName && (
                    <p className="text-red-500 text-xs mt-1">{errors.ACName}</p>
                  )}
                </div>
                <div className="flex flex-col w-full gap-2">
                  <label
                    htmlFor="accountNumber"
                    className="text-[#444444] font-medium text-lg"
                  >
                    Account Number
                  </label>
                  <input
                    name="accountNumber"
                    type="text"
                    placeholder="Enter A/C no"
                    value={employee.bank.accountNumber}
                    onChange={handleInputChange}
                    className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444]   ${
                      errors.ACName ? "!border-red-500 border-2" : ""
                    }`}
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.accountNumber}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full gap-2">
                  <label
                    htmlFor="ifscCode"
                    className="text-[#444444] font-medium text-lg"
                  >
                    IFSC Code
                  </label>
                  <input
                    name="ifscCode"
                    type="text"
                    placeholder="Enter IFSC Code"
                    value={employee.bank.ifscCode}
                    onChange={handleInputChange}
                    className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444]  ${
                      errors.ifscCode ? "!border-red-500 border-2" : ""
                    }`}
                  />
                  {errors.ifscCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.ifscCode}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full gap-2">
                  <label
                    htmlFor="branch"
                    className="text-[#444444] font-medium text-lg"
                  >
                    Bank Name
                  </label>
                  <input
                    name="branch"
                    type="text"
                    placeholder="Enter Bank Name"
                    value={employee.bank.branch}
                    onChange={handleInputChange}
                    className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444]  ${
                      errors.bankName ? "!border-red-500 border-2" : ""
                    }`}
                  />
                  {errors.branch && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.branch}
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-full gap-2">
                  <label
                    htmlFor="bankName"
                    className="text-[#444444] font-medium text-lg"
                  >
                    Bank Name
                  </label>
                  <input
                    name="bankName"
                    type="text"
                    placeholder="Enter Bank Name"
                    value={employee.bank.bankName}
                    onChange={handleInputChange}
                    className={`h-14 px-5 rounded-md shadow-[0_0_5px_0] shadow-gray-300 font-medium text-lg text-[#444444]  ${
                      errors.bankName ? "!border-red-500 border-2" : ""
                    }`}
                  />
                  {errors.bankName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.bankName}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-1/2 max-lg:w-full h-full border-l p-5 flex items-center justify-center">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => handlePassbookImg(event.target.files)}
                    multiple
                  />
                </Button>
              </div>
            </div>

            <div className="w-full p-5 items-center flex justify-center h-full">
              <button
                onClick={() => handleEditEmp(employee)}
                className="w-40 h-12 rounded-xl bg-[--common-color] text-white text-xl font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddnewEmp;
