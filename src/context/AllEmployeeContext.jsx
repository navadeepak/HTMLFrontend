import React, { createContext, useState, useEffect, useContext, memo } from 'react';
import axios from "../Components/utilities/axiosInstance";

// Create the Context
const AllEmployeeContext = createContext();

// Create the Provider Component
const AllEmployeeProvider = memo(({ children }) => {
  const [employees1, setEmployees] = useState([]);
  const [pendingTickets, setPendingTickets] = useState([]);
  const [pendingTicketsLength, setPendingTicketsLength] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [pendingLeavesLength, setPendingLeavesLength] = useState(0);
  const [state, setState] = useState('Initial State');
  const [todayAttendance,setTodayAttendance]=useState();
  const[monthBirthDays,setMonthBirthDays]=useState( )
  const current = new Date();
  const [holiday,setHolidays]=useState()


  const fetchPendingTickets = async () => {
    try {
      const response = await get('http://localhost:3001/employees/tickets/pending');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log(data.pendingTicketsRecords); // Handle the data
  
      let ticketLength = 0;
      data.pendingTicketsRecords.forEach((record) => {
        // console.log(record);
        ticketLength += record.tickets.length; // Corrected property access
      });
      setPendingTicketsLength(ticketLength);
      // console.log(ticketLength);
      
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchPendingLeaves = async () => {
    try {
      const response = await get('http://localhost:3001/employees/leave/pending');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log(data);      
      // console.log(data.pendingLeavesRecords);
    
      let leaveCount = 0;
      data.pendingLeaveRecords.forEach((record) => {
        // console.log(record);
        leaveCount += 1; 
      });
      // console.log(leaveCount);
      
      setPendingLeavesLength(leaveCount);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  
  fetchPendingLeaves()
  fetchPendingTickets();
  
  const fetchData = async () => {
    // console.log("Fetching data...");
    try {
      const [ticketsResponse, leavesResponse,] = await Promise.all([
        axios.get("/employees/tickets/pending"),  
        axios.get("/employees/leave/pending")
      ]);
      const pendingTicketsData = ticketsResponse.data;
      // console.log(pendingTicketsData);
      
      setPendingTickets(pendingTicketsData);
      setPendingTicketsLength(pendingTicketsData.reduce((total, e) => total + e.tickets.length, 0));
      const pendingLeavesData = leavesResponse.data;

      
      setPendingLeaves(pendingLeavesData);
      setPendingLeavesLength(pendingLeavesData.reduce((total, e) => total + e.leave.length, 0));
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get("/employees");
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = response.data;
      // console.log(data);
      setEmployees(data);
      const monthBirthDays=data.filter((e) => {
        const DOB = new Date(e.birthdate);
        // console.log(e.birthdate );
        
        return DOB.getMonth() === current.getMonth() ;
      });

      setMonthBirthDays(monthBirthDays)
      // console.log(monthBirthDays);
      
    } catch (error) {
      console.error("Fetch AllEmployees error:", error);
    }
  };


    const fetchHolidays = async () => {
      try {
        const response = await axios.get("http://localhost:3001/days/get");
        setHolidays(response.data.response);
        // setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        // setLoading(false);
      }
    };



  const todayAllEmpAttendance = async () => {
    try {
      const response= await axios.get(`http://localhost:3001/attendance/today-attendance`);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = response.data.response;
      // console.log(data);
      setTodayAttendance(data);
    } catch (error) {
      console.error("Fetch AllEmployees error:", error);
    }
  };

  useEffect(() => {
    // fetchData();
    fetchHolidays();
    fetchAllEmployees();
    todayAllEmpAttendance();
  }, []);

  return (
    <AllEmployeeContext.Provider value={{ holiday,monthBirthDays,todayAttendance,employees1, state, pendingTickets, pendingTicketsLength, pendingLeaves, pendingLeavesLength, setState }}>
      {children}
    </AllEmployeeContext.Provider>
  );
});

// Create a Custom Hook for Consuming Context
const useAllEmployeeContext = () => {
  const context = useContext(AllEmployeeContext);
  if (context === undefined) {
    throw new Error('useAllEmployeeContext must be used within an AllEmployeeProvider');
  }
  return context;
};

// Export Context, Provider, and Custom Hook
export { AllEmployeeProvider, useAllEmployeeContext };
