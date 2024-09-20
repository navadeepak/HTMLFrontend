import axios from "../../Components/utilities/axiosInstance";
import { useEffect, useState } from "react";
import { useAllEmployeeContext } from "../../context/AllEmployeeContext";

function Notifications() {

 
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/employees");
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;
        setEmployees(data);
        // console.log(data);
        
      } catch (error) {
        //console.error("Fetch AllEmployees error:", error);
      }
    };

    fetchData();
  }, []);

  const filterUpcomingBirthdays = (employees) => {
    const current = new Date();
    return employees.filter((e) => {
      const DOB = new Date(e.birthdate);
      // console.log(e.birthdate);
      return DOB.getMonth() === current.getMonth() ;
    });
  };

  return (
    <div className="bg-white xl:h-1/2 w-full max-xl:w-full h-5/6 max-lg:m-0 max-lg:h-full max-sm:w-full shadow-[0_0_5px_0] shadow-gray-300 rounded-lg flex flex-col">
      <p className="bg-[--common-color] text-white text-center rounded-t-lg shadow-md p-2 h-11 text-lg w-full">
        BIRTHDAYS
      </p>
      <div className="flex flex-col h-fit p-4 gap-1 overflow-y-auto">
        {filterUpcomingBirthdays(employees).map((e) => (
          <div
            className="flex justify-between p-2 border-b border-gray-200"
            key={e._id}
          >
            <p className="text-gray-800 overflow-scroll">{e.username}</p>
            <p className="text-gray-600">{`${new Date(e.birthdate).getDate()}-${new Date(e.birthdate).getMonth() + 1}-${new Date(e.birthdate).getFullYear()}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
