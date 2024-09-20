import React from "react";

function Holidays() {
  const data = [
    { id: 1, title: "Diwali", date: "10/10/2024" },
    { id: 2, title: "Independence Day", date: "15/08/2024" },
    { id: 3, title: "Christmas", date: "25/12/2024" },
    { id: 4, title: "Republic Day", date: "26/01/2024" },
    { id: 5, title: "Holi", date: "17/03/2024" },
    { id: 6, title: "Ganesh Chaturthi", date: "02/09/2024" },
    { id: 7, title: "Durga Puja", date: "21/10/2024" },
    { id: 8, title: "Ram Navami", date: "21/04/2024" },
  ];

  return (
    <div className="flex flex-col justify-between   w-full m-auto mt-4 ml-4 bg-white shadow-md rounded-lg">
      <p className="bg-[#010334] text-white text-center rounded-t-lg  py-2 text-lg">
        Holidays
      </p>
      <div className="mt-2 bg-white flex flex-col items-center justify-between  rounded-b-lg p-4 overflow-y-scroll">
        <div className="w-full bg-gray-200 flex flex-row items-center justify-between px-10 py-2 rounded">
          <p className="font-semibold">Title</p>
          <p className="font-semibold">Date</p>
        </div>
        <div className="overflow-y-scroll w-full h-[400px] flex items-center flex-col overflow-x-hidden">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full p-2 my-2 bg-gray-100 flex flex-row items-center justify-between px-10 rounded hover:bg-gray-200 transition-colors duration-200"
            >
              <p className="text-gray-800 text-sm">
                {index + 1}. {item.title}
              </p>
              <p className="text-sm bg-grey">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Holidays;
