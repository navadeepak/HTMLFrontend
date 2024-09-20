// import React from 'react'
import userAvatar from "../assets/avatar.webp";

const DashboardEmployeeDetails = () => {
  const EmpChat = [
    { id: 1, name: "Ranjith", work: "UI/UX designer", profileImg: userAvatar },
    { id: 2, name: "Ranjith2", work: "UI/UX designer", profileImg: userAvatar },
    { id: 3, name: "Ranjith3", work: "UI/UX designer", profileImg: userAvatar },
    { id: 4, name: "Ranjith3", work: "UI/UX designer", profileImg: userAvatar },
    { id: 5, name: "Ranjith3", work: "UI/UX designer", profileImg: userAvatar },
    { id: 6, name: "Ranjith3", work: "UI/UX designer", profileImg: userAvatar },
    { id: 7, name: "Ranjith3", work: "UI/UX designer", profileImg: userAvatar },
    { id: 8, name: "Ranjith3", work: "UI/UX designer", profileImg: userAvatar },
    { id: 9, name: "Ranjith3", work: "UI/UX designer", profileImg: userAvatar },
  ];

  return (
    <div
      id="main_com"
      className="overflow-x-hidden overflow-y-auto h-[260px] w-1/2"
    >
      {EmpChat.map((emp, key) => (
        <div
          key={key}
          className="w-[290px] h-[85px] flex flex-row justify-evenly items-center"
        >
          <img
            src={emp.profileImg}
            alt="img"
            className="rounded-full w-[50px] h-[50px] bg-slate-600"
          />
          <p className="text-[15px] w-[130px] flex items-start justify-start">
            {emp.name}
            <br />
            {emp.work}
          </p>
          <div className="w-[10px] h-[10px] rounded-full bg-orange-500"></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardEmployeeDetails;
