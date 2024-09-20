import React, { useContext, useEffect, useState } from "react";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import axios from "./utilities/axiosInstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AttendanceContext } from "../context/AttendanceContext";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { Dialog as PrimeDialog } from "primereact/dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LuFilter } from "react-icons/lu";
import { GrNotes } from "react-icons/gr";

const EmployeeDataTable = ({ formattedCheckinTime, formattedCheckoutTime }) => {
  const [attendance, setAttendance] = useState([]);
  const [notevisible, setNotevisible] = useState(false);
  const { id } = useParams();
  const [day, setDay] = useState("");
  const [ststus, setStatus] = useState("");
  const [dayNote, setDayNote] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const current = new Date();

  const { attendanceData, fetchData, setId } = useContext(AttendanceContext);

  const [allAttendanceData, setAllAttendanceData] = useState();

  useEffect(() => {
    setId(id); // Set the ID in the context
    fetchData(id); // Fetch data when the ID is set
  }, [id]);

  useEffect(() => {
    fetchData(id);
  }, [id, formattedCheckinTime, formattedCheckoutTime]);

  useEffect(() => {
    if (
      attendanceData &&
      attendanceData.response &&
      attendanceData.response[0].attendance
    ) {
      setAttendance(attendanceData.response[0].attendance.reverse());
      setAllAttendanceData(attendanceData.response[0].attendance.reverse());
    }
  }, [attendanceData]);

  const EMPAttendanceDate = (attendanceRecord) => {
    const date = new Date(attendanceRecord.date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const EMPAttendanceCheckIn = (attendanceRecord, index) => {
    // console.log(attendanceRecord.checkOut,"attendance",index);

    const checkInTime = new Date(attendanceRecord.checkIn);

    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return checkInTime.toLocaleTimeString(undefined, options);
  };

  const EMPAttendanceCheckOut = (attendanceRecord) => {
    const checkOutTime = new Date(attendanceRecord.checkOut);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return checkOutTime.toLocaleTimeString(undefined, options);
  };

  const handleNote = (data) => {
    setNotevisible(true);
    const date = new Date(data.date);
    setDay(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
    setStatus(data.status);
    setDayNote(data.notes);
  };

  const onHide = () => {
    setNotevisible(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlesearch = (value) => {
    const filteredAttendance = allAttendanceData.filter((day) => {
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
      } else {
        return true; // Show all if "All" is selected
      }
    });

    setAttendance(filteredAttendance);
  };

  const handleDateRangeSubmit = (e) => {
    e.preventDefault();

    // Check if the start and end dates are missing
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

    const filteredAttendance = allAttendanceData.filter((day) => {
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

    // Update the state with the filtered attendance
    setAttendance(filteredAttendance);

    // Close the modal or perform other actions
    handleClose();
  };

  

  return (
    <div className="w-full overflow-hidden">
      <div className="flex space-x-4 mb-4">
        <div className="flex flex-row items-center max-md:flex-col max-md:w-full justify-evenly gap-5 max-sm:justify-start max-sm:w-full max-sm:items-start max-sm:gap-5 font-medium overflow-hidden">
          <div className="flex flex-row items-center justify-evenly max-md:w-full font-medium h-full px-4 py-4 max-sm:py-2 rounded-xl w-fit border shadow-md border-gray-300">
            <p className="h-full text-nowrap">Show : </p>
            <select
              onChange={(e) => handlesearch(e.target.value)}
              name=""
              id=""
              className="bg-white h-full outline-none"
            >
              <option value="All">All</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
            </select>
          </div>
          <div className="max-md:w-full">
            <button
              //  onClick={filterByDateRange}
              // onClick={handleClickOpen}
              className=" gap-5  w-full flex flex-row max-sm:h-10 shadow-md border border-gray-300 rounded-xl items-center justify-evenly font-semibold"
            >
              <React.Fragment>
                <Button className="MUIButton" onClick={handleClickOpen}>
                  {
                    <div className="flex flex-row items-center gap-3">
                      <p>Filter</p>
                      <LuFilter
                        className="text-[--common-color] font-bold"
                        size={20}
                      />
                    </div>
                  }
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    component: "form",
                    onSubmit: (e) => {
                      handleDateRangeSubmit(e);
                    },
                  }}
                  className="h-72 "
                >
                  <DialogTitle>Enter Range</DialogTitle>
                  <DialogContent className="MUIContent">
                    {
                      <div className=" gap-2 flex">
                        <input
                          onChange={(e) => setStartDate(e.target.value)}
                          type="date"
                          className="border border-gray-300 shadow-md rounded-md p-2"
                        />
                        <input
                          onChange={(e) => {
                            setEndDate(e.target.value);
                          }}
                          type="date"
                          className="border border-gray-300 shadow-md rounded-md p-2"
                        />
                      </div>
                    }
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Get</Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            </button>
          </div>
        </div>
      </div>
      <div className=" overflow-scroll">
        <table className="max-lg:min-w-[700px] w-full capitalize mx-auto border rounded-xl overflow-hidden">
          <thead className="sticky top-0 bg-[#F5F5F5] w-full border-b border-gray-300">
            <tr className="flex w-full text-lg">
              <th className="w-1/5 py-4 text-center text-[#444444]">
                Date
              </th>
              <th className="w-1/5 py-4 text-center text-[#444444]">
                Check in
              </th>
              <th className="w-1/5 py-4 text-center text-[#444444]">
                Check out
              </th>
              <th className="w-1/5 py-4 text-center text-[#444444]">
                Status
              </th>
              <th className="w-1/5 py-4 text-center text-[#444444]">
                Notes
              </th>
            </tr>
          </thead>

          <tbody className="h-[350px] overflow-y-scroll">
            {attendance.map((item, index) => (
              <tr
                key={index}
                className="flex w-full py-2 border-b-2 border-gray-200 text-[#444444] font-normal"
              >
                <td className="w-1/5 text-center flex items-center justify-center">{EMPAttendanceDate(item)}</td>
                <td className="w-1/5 text-center flex items-center justify-center">
                  {EMPAttendanceCheckIn(item, index)}
                </td>
                <td className="w-1/5 text-center flex items-center justify-center">
                  {EMPAttendanceCheckOut(item)}
                </td>
                <td
                  className={`w-1/5 text-center flex items-center justify-center`}
                >
                  <p
                    className={` px-2 py-1 ${
                      item.status === "Present"
                        ? "bg-green-100 text-[#006E1D] rounded-lg"
                        : item.status === "Absent"
                        ? "bg-red-100 text-red-600 rounded-lg"
                        : item.status === "Holiday"
                        ? "bg-blue-100 text-blue-600 rounded-lg"
                        : item.status === "Half-Day"
                        ? "bg-orange-100 text-orange-600 rounded-lg"
                        : ""
                    }`}
                  >
                    {item.status}
                  </p>
                </td>
                <td className="w-1/5 text-center flex items-center justify-center">
                  <button
                    onClick={() => handleNote(item)}
                    className="px-2 py-2 bg-white text-[--common-color] border-[1px] border-[--bg-gray] shadow-md rounded-md hover:scale-105 duration-200"
                  >
                    <GrNotes className="h-6 w-8" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PrimeDialog
        header="Notes"
        visible={notevisible}
        onHide={onHide}
        position="bottom-right"
        style={{ width: "350px", height: "40vh" }}
      >
        <div className="flex justify-between">
          <p>{day}</p>
          <p>{ststus}</p>
        </div>
        <p className="mt-4">{dayNote}</p>
      </PrimeDialog>
    </div>
  );
};

export default EmployeeDataTable;
