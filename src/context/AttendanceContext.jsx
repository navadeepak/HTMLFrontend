import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from '../Components/utilities/axiosInstance';
import { useParams } from 'react-router-dom';

// Create the Attendance Context
export const AttendanceContext = createContext();

// Create a Provider component
export const AttendanceProvider = ({ children }) => {
    const {EmpId}=useParams();
    const [attendanceData, setAttendanceData] = useState([]);
    const [id, setId] = useState("");
    const [todayAttendance,setTodayAttendance]=useState("")
    const [allAttendance,setAllAttendance]=useState("")

    // console.log(EmpId);
    
    useEffect(() => {
        const fetchUserRole = async (email) => {
          try {
            const response = await axios.get(`employees/check-role/${email}`);
            // console.log(response.data);
            setId(response.data.employee_ID)       
          } catch (error) {
            console.error("Error fetching user role:", error.message);
          }
        };
    
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.email) {
          fetchUserRole(user.email);
        }
      }, []);

    useEffect(()=>{
        fetchData();
        AllEmp();
    },[id])

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3001/attendance/attendance/${id}`);
            if (response.status !== 200) {
                throw new Error("Network response was not ok");
            }
            const data = response.data; 
            setAttendanceData(data);
            // console.log(data)
        } catch (error) {
            console.error("Fetch attendance error:", error);
            // setAttendanceData("sakthi");
        }
    }, [id]);

    const AllEmp= useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3001/attendance/all-attendance`);
            if (response.status !== 200) {
                throw new Error("Network response was not ok");
            }
            // console.log(response.data.response);   
            const data = response.data.response;  
            // const data1=response.data;          
            setAllAttendance(data);
            // setTodayAttendance(data1)
        } catch (error) {
            console.error("Fetch attendance error:", error);
        }
    }, []);

    return (
        <AttendanceContext.Provider value={{ allAttendance,todayAttendance, attendanceData, fetchData, setId }}>
            {children}
        </AttendanceContext.Provider>
    );
};
