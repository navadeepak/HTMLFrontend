import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Avatar, AvatarGroup, Stack } from "@mui/material";
import avatar from "../assets/avatar.webp";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { PiLinkThin } from "react-icons/pi";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { GoBell } from "react-icons/go";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { Cancel } from "@mui/icons-material";
import axios from "../Components/utilities/axiosInstance";

function  DashboardCalendar({ meetinfo = [], emp_ID,emp }) {

  
  const [value, setValue] = useState(new Date());
  // const onChange = (nextValue) => {
  //   setValue(nextValue);
  // };
  const showAll = meetinfo;
  const ShowLess = meetinfo.slice(0, 10);
  const [show, setShow] = useState(1);
  const [expand, setExpand] = useState(false);
  const [discriptionData, setDiscriptionData] = useState("");
  const meetDate = meetinfo.map((meetinfo) => meetinfo.date);

  const [met,setMet]=useState([]);

  const [teamMet,setTeamMeet]=useState([]);

  //-----date function starts here-------

  const now = new Date(); // Current date

  const getMeetingCount = (date) => {
    return meetDate.filter((meetingDate) => {
      const meetingDateObj = new Date(meetingDate);
      return (
        date.getDate() === meetingDateObj.getDate() &&
        date.getMonth() === meetingDateObj.getMonth() &&
        date.getFullYear() === meetingDateObj.getFullYear()
      );
    }).length;
  };
   
  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/employees/meetings/all');
        const data = response.data.filter((e) => e.employee_ID === emp_ID);

        if (data.length > 0) {
          setMet(data[0].meetings);
        }

        console.log("Individual",data[0]?.meetings);        
      } catch (error) {
        console.error('Error fetching meeting data:', error.message);
      }
    };

    if (emp_ID) {
      fetchMeetingData(); // Call the function here
    }
  }, [emp]);

  useEffect(() => {
    const fetchTeamMeetingData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/employees/get_team_meet/${emp.work_role}`);
        const data = response.data.meetings;
        const filteredData = data.filter((e) => e.meeting_type === "1");

        setTeamMeet(filteredData);

        console.log("Team",data);      
      } catch (error) {
        console.error('Error fetching team meeting data:', error.message);
      }
    };

    if (emp.work_role) {
      fetchTeamMeetingData(); // Call the function here
    }
  }, [emp]);



  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#1890ff",
          ...theme.applyStyles("dark", {
            backgroundColor: "#177ddc",
          }),
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: "rgba(0,0,0,.25)",
      boxSizing: "border-box",
      ...theme.applyStyles("dark", {
        backgroundColor: "rgba(255,255,255,.35)",
      }),
    },
  }));


  return (
    <div className="w-full p-5 bg-white">
      
      {/* {met&&console.log(met) } */}
      {/* {met?.length > 0 ? ( */}
        <div className="h-[80vh] max-xl:h-full grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 gap-5 p-5 w-full overflow-scroll font-bold shadow-[0_0_5px_0] shadow-gray-300 rounded-xl">
          {met?.map((e, index) => (
            <div
              key={index}
              className="flex text-sm max-2xl:h-[650px] h-[550px] rounded-xl shadow-[0_0_5px_0] shadow-gray-300 p-5"
            >
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-col pb-5 gap-2">
                  <div className="flex justify-between mb-5 w-full">
                    <span className="text-[#444444] text-xl">
                      {e.meeting_type == 0 ? "Individual" : "Team"} Meet
                    </span>
                    <span className="w-1/2 text-sm text-right mr-3">
                      {e.start_time || "9.30 PM"}
                    </span>
                  </div>
                  <div className={`${e.meeting_type === "0" ? "hidden" : ""}`}>
                    <AvatarGroup total={24}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                      />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroup>
                  </div>
                  <div
                    className={`${
                      e.meeting_type === "team" ? "hidden" : ""
                    } w-12 h-12 rounded-full flex flex-row gap-10`}
                  >
                    <div>
                      <p className="text-[#444444] text-lg">{e.employee_ID}</p>
                      <p className="text-[#444444] text-lg">{e.username}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0">
                    <div>
                      <label className="font-normal text-lg text-[#444444]">
                        Assigined by : {e.assgin_by}
                      </label>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="ml-2 pt-5 space-y-5">
                  <div className="text-lg text-[#2d3436] font-medium flex flex-row items-center gap-5">
                    <CiCalendar className="w-7 h-7" />

                    <p className=" font-medium text-[#636e72]">{e.date}</p>
                  </div>
                  <div className="text-lg text-[#2d3436] font-medium flex flex-row items-center gap-5">
                    <CiClock2 className="w-7 h-7" />

                    <p className="font-medium text-[#636e72]">
                      {e.time}-{e.duration || "1 hour"}
                    </p>
                  </div>
                  <div className="text-lg text-[#2d3436] font-medium flex flex-row items-center gap-5">
                    <PiLinkThin className="w-7 h-7" />
                    <p className="p-1 px-0  text-xs mt-1 font-semibold text-[--common-color]">
                      <a href={e.meeting_link} className="text-lg">
                        Meet Link
                      </a>
                    </p>
                  </div>
                  <div className="text-lg text-[#2d3436] font-medium flex flex-row gap-5">
                    <div className="h-full flex flex-col items-baseline">
                      <HiOutlineMenuAlt2 className="w-7 h-8" />
                    </div>
                    <p
                      className={`font-medium text-[#636e72] ${
                        e.description.length > 20 ? "" : "hidden"
                      }`}
                    >
                      <span>
                        {e.description && e.description.length > 20
                          ? `${e.description.slice(0, 100)}`
                          : e.description}
                      </span>
                      <button
                        className="text-[#555555]"
                        onClick={() => {
                          setExpand(true);
                          setDiscriptionData(e.description);
                        }}
                      >
                        ...Read More
                      </button>
                    </p>
                    <p
                      className={`font-medium text-[#636e72] ${
                        e.description.length > 20 ? "hidden" : ""
                      }`}
                    >
                      {e.description}
                    </p>
                  </div>
                  {/* <div className="text-lg text-[#2d3436] font-medium flex flex-row items-center gap-5">
                    <GoBell className="w-5 h-5" />
                    <p className="text-[#636e72]">Notify Me</p>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center" }}
                    >
                      <AntSwitch
                        defaultChecked
                        inputProps={{ "aria-label": "ant design" }}
                      />
                    </Stack>
                  </div> */}
                </div>
              </div>
            </div>
          ))}

          {teamMet?.map((e, index) => (
            <div
              key={index}
              className="flex text-sm max-2xl:h-[650px] h-[550px] rounded-xl shadow-[0_0_5px_0] shadow-gray-300 p-5"
            >
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-col pb-5 gap-2">
                  <div className="flex justify-between mb-5 w-full">
                    <span className="text-[#444444] text-xl">
                      {e.meeting_type == 0 ? "Individual" : "Team"} Meet
                    </span>
                    <span className="w-1/2 text-sm text-right mr-3">
                      {e.start_time || "9.30 PM"}
                    </span>
                  </div>
                  <div className={`${e.meeting_type === "0" ? "hidden" : ""}`}>
                    {/* <AvatarGroup total={24}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                      <Avatar
                        alt="Travis Howard"
                        src="/static/images/avatar/2.jpg"
                      />
                      <Avatar
                        alt="Agnes Walker"
                        src="/static/images/avatar/4.jpg"
                      />
                      <Avatar
                        alt="Trevor Henderson"
                        src="/static/images/avatar/5.jpg"
                      />
                    </AvatarGroup> */}
                  </div>
                  <div
                    className={`${
                      e.meeting_type === "team" ? "hidden" : ""
                    } w-12 h-12 rounded-full flex flex-row gap-10`}
                  >
                    <div>
                      <p className="text-[#444444] text-lg">{e.employee_ID}</p>
                      <p className="text-[#444444] text-lg">{e.username}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0">
                    <div>
                      <label className="font-normal text-lg text-[#444444]">
                        Assigined by : {e.assigned_by}
                      </label>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="ml-2 pt-5 space-y-5">
                  <div className="text-lg text-[#2d3436] font-medium flex flex-row items-center gap-5">
                    <CiCalendar className="w-7 h-7" />

                    <p className=" font-medium text-[#636e72]">{e.date}</p>
                  </div>
                  <div className="text-lg text-[#2d3436] font-medium flex flex-row items-center gap-5">
                    <CiClock2 className="w-7 h-7" />

                    <p className="font-medium text-[#636e72]">
                      {e.start_time}-{e.duration || "1 hour"}
                    </p>
                  </div>
                  <div className="text-lg text-[#2d3436] font-medium flex flex-row items-center gap-5">
                    <PiLinkThin className="w-7 h-7" />
                    <p className="p-1 px-0  text-xs mt-1 font-semibold text-[--common-color]">
                      <a href={e.meeting_link} className="text-lg">
                        Meet Link
                      </a>
                    </p>
                  </div>
                  <div className="text-lg text-[#2d3436] font-medium flex flex-row gap-5">
                    <div className="h-full flex flex-col items-baseline">
                      <HiOutlineMenuAlt2 className="w-7 h-8" />
                    </div>
                    <p
                      className={`font-medium text-[#636e72] ${
                        e.description.length > 20 ? "" : "hidden"
                      }`}
                    >
                      <span>
                        {e.description && e.description.length > 20
                          ? `${e.description.slice(0, 100)}`
                          : e.description}
                      </span>
                      <button
                        className="text-[#555555]"
                        onClick={() => {
                          setExpand(true);
                          setDiscriptionData(e.description);
                        }}
                      >
                        ...Read More
                      </button>
                    </p>
                    <p
                      className={`font-medium text-[#636e72] ${
                        e.description.length > 20 ? "hidden" : ""
                      }`}
                    >
                      {e.description}
                    </p>
                  </div>
                  {/* <div className="text-lg text-[#2d3436] font-medium flex flex-row items-center gap-5">
                    <GoBell className="w-5 h-5" />
                    <p className="text-[#636e72]">Notify Me</p>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center" }}
                    >
                      <AntSwitch
                        defaultChecked
                        inputProps={{ "aria-label": "ant design" }}
                      />
                    </Stack>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
          <div
            className={`${
              expand ? "flex" : "hidden"
            } flex justify-center items-center absolute top-0 left-0 bg-[#00000050] w-screen h-screen`}
          >
            <div className=" w-[500px] h-96 bg-white p-5 rounded-xl">
              <p
                className="cursor-pointer bg-white w-full flex items-center justify-end"
                onClick={() => {
                  setExpand(false);
                }}
              >
                <Cancel />
              </p>
              <div>{discriptionData}</div>
            </div>
          </div>
        </div>
      {/* ) : (
        <div className="h-[80vh] w-full border font-bold shadow-[0_0_5px_0] shadow-gray-300 rounded-xl flex items-center justify-center">
          No Meeting Found
        </div>
      )} */}
    </div>
  );
}

export default DashboardCalendar;
