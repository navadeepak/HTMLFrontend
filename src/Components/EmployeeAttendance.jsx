import { LuFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AttendanceContext } from "../context/AttendanceContext";
import { useContext, useEffect, useState } from "react";
import { DialogContentText } from "@mui/material";

function EmployeeAttendance() {
  const { allAttendance } = useContext(AttendanceContext);
  const [allEmpData, setAllEmpData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [notesOpen, setNotesOpen] = useState(false);
  const [datastore, setDatastore] = useState("")
  const current = new Date();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const notesopen = (e) => {
    setNotesOpen(true);
    setDatastore(e)
  };
  const notesclose = () => {
    setNotesOpen(false);
  };

  const EMPAttendanceDate = (attendanceRecord) => {
    const date = new Date(attendanceRecord.date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const EMPAttendanceCheckIn = (attendanceRecord) => {
    const checkInTime = new Date(attendanceRecord.checkIn);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return checkInTime.toLocaleTimeString(undefined, options);
  };

  const EMPAttendanceCheckOut = (attendanceRecord) => {
    const checkOutTime = new Date(attendanceRecord.checkOut);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return checkOutTime.toLocaleTimeString(undefined, options);
  };

  useEffect(() => {
    const data = [];

    if (allAttendance) {
      allAttendance.forEach((emp) => {
        emp.attendance.forEach((day) => {
          data.push({
            name: emp.name,
            employee_ID: emp.employee_ID,
            date: day.date,
            checkIn: day.checkIn,
            checkOut: day.checkOut,
            status: day.status,
            notes: day.notes,
          });
        });
      });

      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      setAllData(data.reverse());
      setAllEmpData(data);
    }
  }, [allAttendance]);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = allData.filter((employee) => {
      const username = employee.name.toLowerCase();
      const employeeID = String(employee.employee_ID).toLowerCase();
      return username.includes(value) || employeeID.includes(value);
    });
    setAllEmpData(filtered);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlesearch = (value) => {
    const filteredAttendance = allData.filter((day) => {
      const dayDate = new Date(day.date);
  
      if (value === "Today") {
        return (
          dayDate.getDate() === current.getDate() &&
          dayDate.getMonth() === current.getMonth() &&
          dayDate.getFullYear() === current.getFullYear()
        );
      } else if (value === "Yesterday") {
        const yesterday = new Date(current);
        yesterday.setDate(current.getDate() - 1);
        return (
          dayDate.getDate() === yesterday.getDate() &&
          dayDate.getMonth() === yesterday.getMonth() &&
          dayDate.getFullYear() === yesterday.getFullYear()
        );
      } else if (value === "all") {
        return true; // Display all data when "All" is selected
      } else {
        return true; // Default condition to return all if no specific filter is applied
      }
    });
  
    setAllEmpData(filteredAttendance);
  };

  const handleDateRangeSubmit = (e) => {
    e.preventDefault();
  
    // Check if startDate and endDate exist and are valid
    if (!startDate) {
      toast.error("Enter starting date");
      return;
    }
  
    if (!endDate) {
      toast.error("Enter ending date");
      return;
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (start > end) {
      toast.error("Start date cannot be later than end date");
      return;
    }
  
    // Filter attendance records based on date range
    const filteredAttendance = allData.filter((day) => {
      const dayDate = new Date(day.date);
  
      return (
        (dayDate.getFullYear() > start.getFullYear() ||
          (dayDate.getFullYear() === start.getFullYear() &&
            dayDate.getMonth() > start.getMonth()) ||
          (dayDate.getFullYear() === start.getFullYear() &&
            dayDate.getMonth() === start.getMonth() &&
            dayDate.getDate() >= start.getDate())) &&
        (dayDate.getFullYear() < end.getFullYear() ||
          (dayDate.getFullYear() === end.getFullYear() &&
            dayDate.getMonth() < end.getMonth()) ||
          (dayDate.getFullYear() === end.getFullYear() &&
            dayDate.getMonth() === end.getMonth() &&
            dayDate.getDate() <= end.getDate()))
      );
    });
  
    // Update state with filtered attendance data
    setAllEmpData(filteredAttendance);
  
    // Close the modal
    handleClose();
  };
  

  return (
    <div className="w-full gap-5 max-sm:w-screen max-sm:px-5 max-sm:overflow-hidden">
      <div className="flex flex-row max-md:flex-col gap-3 w-full items-center h-full px-5 mb-5 max-sm:px-0">
        <div className="text-sm flex gap-4 px-4 h-fit bg-white shadow-md w-1/3 max-md:w-full max-lg:w-1/2 max-sm:w-full items-center justify-center flex-row 2xl:flex border-[1px] border-gray-300 rounded-xl">
          <RiSearchLine className="w-[25px] h-[25px] text-gray-400" />
          <input
            type="text"
            placeholder="Filter by Employee ID or Name"
            className="w-full h-full py-4 outline-none rounded-md text-lg"
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-row w-full h-full items-center max-sm:justify-between gap-3 max-sm:gap-0">
          <div className="flex flex-row items-center justify-evenly max-sm:w-1/2 font-medium h-full px-4 py-4 rounded-xl w-fit  border shadow-md border-gray-300">
            <p className="h-full text-nowrap">Show : </p>
            <select
               onChange={(e) => handlesearch(e.target.value)}
              name=""
              id=""
              className="bg-white h-full max-sm:w-1/2 outline-none"
            >
              <option value="all">All</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
            </select>
          </div>
          <div className="max-md:w-full max-sm:w-1/2">
            <button
              className="gap-5 w-full flex flex-row shadow-md border border-gray-300 rounded-xl items-center justify-evenly font-semibold"
              onClick={handleClickOpen}
            >
              <div className="flex flex-row items-center gap-3 px-10 h-14">
                <p>Filter</p>
                <LuFilter className="text-[--common-color]"/>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="max-xl:overflow-scroll max-lg:border max-lg:border-gray-300 rounded-xl">
        <table className="w-full px-0 h-full pb-0 border border-gray-300 mx-auto  bg-white max-lg:border-none my-0 flex flex-col text-sm mt-0 text-center shadow-lg rounded-lg overflow-hidden max-lg:w-[1000px]">
          <thead className="px-0 py-0 bg-[#F5F5F5] capitalize rounded-t-md flex justify-between sticky top-0 max-lg:w-[1000px]">
            <tr className="w-full text-lg flex flex-row justify-between items-center h-14 max-lg:w-[1000px] border-b">
              <th className="w-1/5">Name</th>
              <th className="w-1/6">Employee-ID</th>
              <th className="w-1/6">Date</th>
              <th className="w-1/6">Check In</th>
              <th className="w-1/6">Check Out</th>
              <th className="w-1/6">Status</th>
              <th className="w-1/6">Notes</th>
            </tr>
          </thead>
          <tbody className="flex gap-5 flex-col">
          {console.log(allEmpData)}
            {allEmpData.map((data, index) => (
              <tr
                key={index}
                className="w-full text-lg flex flex-row justify-between items-center max-lg:w-[1000px] border-b h-14"
              >
                <td className="w-1/5">{data.name}</td>
                <td className="w-1/6">{data.employee_ID}</td>
                <td className="w-1/6">{EMPAttendanceDate(data)}</td>
                <td className="w-1/6">{EMPAttendanceCheckIn(data)}</td>
                <td className="w-1/6">{EMPAttendanceCheckOut(data)}</td>
                <td className="w-1/6 flex items-center justify-center"><p className={`px-2 ${data.status === "Present" && "text-green-500 bg-green-100"} ${data.status === "Absent" && "text-red-500 bg-red-100"} ${data.status === "Holiday" && "text-sky-500 bg-sky-100"} ${data.status === "Half Day" && "text-orange-500 bg-orange-100"} ${data.status === "Full Day" && "text-red-500 bg-red-100 "} w-fit rounded-lg`}>{data.status}</p></td>
                <td className="w-1/6">
                  <React.Fragment>
                    <Button variant="outlined" onClick={()=>notesopen(data.notes)}>
                      Open Notes
                    </Button>
                    <Dialog
                      open={notesOpen}
                      onClose={notesclose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Notes"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          <p>{datastore}</p>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={notesclose} autoFocus>
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        className="flex items-center justify-center h-96"
        PaperProps={{
          component: "form",
          onSubmit: handleDateRangeSubmit, // Directly use the submit handler
        }}
      >
        <DialogTitle>Enter Date Range</DialogTitle>
        <DialogContent className="MUIContent">
          <div className="gap-2 flex">
            <input
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              className="border border-gray-300 shadow-md rounded-md p-2"
            />
            <input
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              className="border border-gray-300 shadow-md rounded-md p-2"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Get</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmployeeAttendance;