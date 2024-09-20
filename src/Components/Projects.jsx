import { useEffect, useState } from "react";
import axios from "./utilities/axiosInstance";
import { IoIosArrowForward } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { IoAddCircle } from "react-icons/io5";

const Projects = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [detailsTable, setDetailsTable] = useState(false);
  const [head, setHead] = useState("Add Projects");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [details, setDetails] = useState("");
  const [teamMember, setTeamMember] = useState("");
  const [deadline, setDeadline] = useState("");
  const [projectId, setprojectId] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const today = new Date();

  const [status, setStatus] = useState("");

  useEffect(() => {
    const ProjectData = async () => {
      try {
        const response = await axios.get("/project/get-project");
        //console.log(response.data);
        setData(response.data);
        setData(response.data);
        setIsLoading(false);

        //  data.map((e)=>{//console.log(e.projectId)})
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    ProjectData();
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleAddProject = () => {
    setVisible(true);
    setHead("Add Projects");
    handleBlankState();
  };

  const onHide = () => {
    setVisible(false);
    setDetailsTable(false);
  };

  const handleEditProject = (data) => {
    setVisible(true);
    setHead("Edit Projects");
    handleDataState(data);
  };

  const handleDetails = (data) => {
    setDetailsTable(true);
    handleDataState(data);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setDeadline(e.target.value);
  };

  const handleAddedProject = async () => {
    if (
      !category ||
      !type ||
      !totalAmount ||
      !details ||
      !teamMember ||
      !deadline
    ) {
      alert("Please fill in all fields");
      return;
    }

    const formData = {
      category,
      type,
      totalAmount,
      details,
      teamMembers: teamMember.split(","),
      deadline,
      status,
    };

    try {
      const response = await axios.post("/project/create-project", formData);
      //console.log("Project created successfully:", response.data);
      handleBlankState();
      onHide();
      window.location.reload();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //console.log(deadline);

    head === "Add Projects" ? handleAddedProject() : handleEditedProject();
  };

  const handleEditedProject = async () => {
    if (
      !category ||
      !type ||
      !totalAmount ||
      !details ||
      !teamMember ||
      !deadline
    ) {
      alert("Please fill in all fields");
      return;
    }

    const formData = {
      category,
      type,
      totalAmount,
      details,
      teamMembers: teamMember.split(","),
      deadline,
      status,
    };

    try {
      const url = `/project/edit-project/${projectId}`;

      const response = await axios.patch(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      //console.log("Project updated successfully:", response.data);
      handleBlankState();
      onHide();
      window.location.reload();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };
  const handledeadline = () => {
    var deadLine = new Date(deadline);
    // console.log(deadLine)
    const date = deadLine.getDate();
    const month = deadLine.getMonth();
    const year = deadLine.getFullYear();
    return <p>{`${date}/${month + 1}/${year}`}</p>;
  };

  const handleBlankState = () => {
    setCategory("");
    setType("");
    setTotalAmount("");
    setDetails("");
    setTeamMember("");
    setDeadline("");
    setStatus("");
  };

  const handleDataState = (data) => {
    //    const projectId=parseInt(data.projectId);
    setCategory(data?.category);
    setType(data.type);
    setTotalAmount(data.totalAmount);
    setDetails(data.details);
    setTeamMember(data.teamMembers.join(","));
    setDeadline(data.deadline);
    //console.log(data.projectId);
    setprojectId(data.projectId);
    setStatus(data.status);
  };

  return (
    <div className="mt-0 bg-[--bg-gray] h-fit mx-0 pb-4 max-sm:ml-0 max-lg:mr-10 max-sm:mr-0 ">
      <div className="w-full flex flex-col justify-between mx-0">
        <p className=" bg-[--title-bg] py-2 px-5 mb-2 max-sm:pl-1 text-3xl text-[--title-text] font-light max-sm:text-sm">
          <span className="border-l-4 border-[--title-text] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
            <p className="animate-slide p-2">Projects</p>
          </span>
        </p>
        <div className="w-full flex items-center justify-start px-5 my-2 ">
          <button
            className="flex flex-row items-center justify-evenly w-fit h-fit px-3 py-2 max-sm:w-[100px] max-sm:h-[30px] max-sm:text-sm max-lg:px-4 max-sm:px-0 text-nowrap rounded-md border-[1px] border-[--bg-gray] hover:bg-[--common-color] hover:text-white hover:border-[--common-color] bg-white shadow-md duration-200 text-[--common-color] max-sm:m-2 max-sm:mr-0 max-lg:mr-0"
            onClick={handleAddProject}
          >
            <p className="mx-2">Add Projects</p>
            <IoAddCircle className="mx-2 w-[20px] h-[20px]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 w-full justify-items-center gap-0 m-0 p-0 overflow-scroll h-full max-sm:grid-cols-1 max-lg:grid-cols-1 max-xl:grid-cols-2">
        {data.map((data, index) => (
          <div
            key={index}
            className="mt-4 w-[400px] max-2xl:w-[380px] 2xl:w-[440px]  max-sm:w-full max-lg:w-full h-[300px] shadow-md border-[1px] border-[--bg-gray] rounded-md flex flex-col items-center justify-evenly border-t-4 border-t-[--common-color] bg-white hover:border-[--common-color] duration-200"
          >
            <p className="w-[300px] max-md:text-base flex items-center justify-center text-[28px] text-[--common-color] text-2xl text-semibold max-lg:text-3xl">
              {data.category}
            </p>
            <div className="w-[300px] flex flex-col items-center justify-evenly">
              <p className="w-[250px] max-lg:flex max-lg:w-fit max-lg:items-center max-md:text-sm max-lg:text-wrap max-lg:px-2 text-[20px] max-lg:text-xl max-lg:text-center">
                {data.type}
              </p>
              <p className="w-[250px] max-lg:flex max-lg:w-fit max-lg:items-center text-[--common-color] text-[15px] max-lg:text-lg">
                Type
              </p>
            </div>
            <div className="w-[300px] flex flex-col items-center justify-evenly">
              <p className="w-[250px] max-lg:flex max-lg:w-fit max-lg:items-center text-[20px]">
                ${data.totalAmount}
              </p>
              <p className="w-[250px] max-lg:flex max-lg:w-fit max-lg:items-center text-[--common-color] text-[15px] max-lg:text-lg">
                Total Amount
              </p>
            </div>
            <div className="flex w-full items-center justify-between max-md:gap-1 px-10 max-sm:px-0 max-md:flex-col max-md:items-center max-md:justify-center">
              <button
                className="px-3 py-2 max-lg:w-1/2 flex flex-row items-center justify-evenly max-lg:justify-center text-white rounded bg-[--gray] hover:scale-105 shadow-lg duration-200 "
                onClick={() => handleDetails(data)}
              >
                <span className="text-[18px] font-light max-lg:mx-4">
                  Details
                </span>
                <IoIosArrowForward />
              </button>
              <button
                className="w-24 max-lg:w-1/2 shadow-lg h-fit px-3 py-2 bg-[--blue] hover:scale-105 flex flex-row items-center justify-evenly max-lg:justify-center rounded text-white duration-200"
                onClick={() => handleEditProject(data)}
              >
                <span className="text-[18px] font-light max-lg:mx-4">Edit</span>
                <MdModeEditOutline className="group-hover:text-white group-hover:z-50" />
              </button>
            </div>
          </div>
        ))}

        <Dialog
          header={head}
          visible={visible}
          position={"center"}
          className="w-1/4 bg-gray-900  rounded-md max-xl:w-1/2 max-sm:w-full"
          onHide={onHide}
          draggable={false}
        >
          <div className="h-full w-full border-t-4 border-[--common-color] border-[1px] bg-white shadow-md rounded-md p-2 ">
            <form onSubmit={handleSubmit} className="">
              <div className="mb-4">
                <label className="block text-[--common-color]">Category</label>
                <input
                  placeholder="Enter Category "
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border-[1px] border-[--bg-gray] bg-white shadow-md px-3 py-2 rounded-md outline-[--common-color]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[--common-color]">Type</label>
                <input
                  placeholder="Enter Type"
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border-[1px] border-[--bg-gray] bg-white shadow-md px-3 py-2 rounded-md outline-[--common-color]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[--common-color]">
                  Total Amount
                </label>
                <input
                  placeholder="Enter Total Amount"
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-full border-[1px] border-[--bg-gray] bg-white shadow-md px-3 py-2 rounded-md outline-[--common-color]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[--common-color]">Details</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full border-[1px] border-[--bg-gray] bg-white shadow-md px-3 py-2 rounded-md outline-[--common-color]"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-[--common-color]">
                  Team Member
                </label>
                <input
                  placeholder="Enter Team Member"
                  type="text"
                  value={teamMember}
                  onChange={(e) => setTeamMember(e.target.value)}
                  className="w-full border-[1px] border-[--bg-gray] bg-white shadow-md px-3 py-2 rounded-md outline-[--common-color]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[--common-color]">Deadline</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={formatDate(today)}
                  // onChange={(e) => setDeadline(e.target.value)}
                  className="w-full border-[1px] border-[--bg-gray] bg-white shadow-md px-3 py-2 rounded-md outline-[--common-color]"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-[--common-color]">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border-[1px] border-[--bg-gray] bg-white shadow-md px-3 py-2 rounded-md outline-[--common-color]"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="OnGoing">OnGoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              {head === "Add Projects" ? (
                <div className="w-full flex items-center justify-center">
                  <button
                    type="submit"
                    className=" py-2 px-10 shadow-lg bg-[--green] text-white hover:scale-105  rounded duration-300"
                  >
                    <p className="flex items-center justify-center w-full h-full duration-200 rounded-md text-lg">
                      Add
                    </p>
                  </button>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center">
                  <button
                    type="submit"
                    className=" py-2 px-10 shadow-lg bg-[--blue] text-white hover:scale-105  rounded duration-300"
                  >
                    <p className="flex items-center justify-center w-full h-full duration-200 rounded-md text-lg">
                      Save
                    </p>
                  </button>
                </div>
              )}
            </form>
          </div>
        </Dialog>

        <div className="h-full w-full">
          <Dialog
            header={"Details"}
            visible={detailsTable}
            position={"center"}
            className="w-1/3 h-2/3 bg-gray-900"
            onHide={onHide}
            draggable={false}
          >
            {/* <p className='text-xl'>{category}</p>
                <p>{type}</p>
                <p>{totalAmount}</p>    
            {/* <p>{teamMember.split(",").map((e, i) => <div key={i}><span>{i + 1}.{e} </span></div>)}</p> 
                <p>{deadline}</p> */}
            <div className="w-full h-full flex-col overflow-y-scroll shadow-lg border-t-4 border-[--common-color] rounded-md  bg-white px-2 ">
              <div className="flex justify-center mb-4">
                <h1 className="text-2xl font-semibold text-[--common-color] mt-4">
                  {category}
                </h1>
              </div>
              <div className="shadow-[0_0_5px_0] shadow-gray-300 rounded-md p-4">
                <p className=" text-lg font-medium mb-4">Description</p>
                <div className="flex flex-row justify-between text-sm">
                  <p
                    className={`text-white px-2 py-1 rounded-md ${
                      status === "Not Started" && "bg-[--red-button]"
                    } ${status === "OnGoing" && "bg-[--blue-button]"} ${
                      status === "Completed" && "bg-[--teal-lite]"
                    } `}
                  >
                    {status}
                  </p>
                  <p className="text-gray-600 px-2 py-1 rounded-md">
                    <span className="inline-block">{handledeadline()}</span>
                  </p>
                </div>
                <hr className="my-3 border-gray-300" />
                <p className="font-medium  text-lg text-center mb-2">
                  {details}
                </p>
                <p className=" text-lg font-medium ">Team Members:</p>
                <div className=" justify-evenly py-2 px-4">
                  <p className="grid grid-cols-3">
                    {teamMember.split(",").map((e, i) => (
                      <div
                        key={i}
                        className="bg-[--bg-gray] text-[--common-color] p-1 flex items-center justify-center m-1 rounded-md "
                      >
                        <span>{e} </span>
                      </div>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Projects;
