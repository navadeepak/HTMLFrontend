import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from '../Components/utilities/axiosInstance';

// Create the context
const EmployeeContext = createContext();

// Create a provider component
export const EmployeeProvider = ({ children }) => {
    const [employee, setEmployee] = useState([]);
    const [role, setRole] = useState('');
    const [oneEmp,setOneEmp]=useState({})
  
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(()=>{
        attendance();   
    },[])

    const attendance = async() => {
        try {
            const response = await axios.get(
                `http://localhost:3001/employees/check-role/${user.email}`
            );
            setEmployee(response.data);
            // console.log(response.data);
            setOneEmp(response.data)
            return response.data;
        } catch (error) {
            console.warn("Error fetching user role:", error.message,"sakthi");
        }
    };

    const tasklist = useCallback(async (employeeID) => {
        try {
            const response = await axios.get(
                `http://localhost:3001/employees/task_list/${employeeID}`
            );
            const data = response.data;           
            return data;
        } catch (error) {
            console.warn("Error fetching task list:", error.message);
            return error.message;
        }
    }, []);



    return (
        <EmployeeContext.Provider value={{ employee, role,tasklist ,oneEmp  }}>
            {children}
        </EmployeeContext.Provider>
    );
};

// Custom hook to use the EmployeeContext
export const useEmployeeContext = () => {
    return useContext(EmployeeContext);
};
