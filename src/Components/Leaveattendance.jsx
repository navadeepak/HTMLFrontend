

import { useState, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, ChartDataLabels);

const LeaveAtendence = ({ leaveDataProps, atdProps }) => {

  const ar4 = [
    { status: "Present", icon: "🟢" },
    { status: "Absent", icon: "🟠" },
  ];

  const data = {
    datasets: [
      {
        data: atdProps,
        backgroundColor: ["#175978", "#2183ac"],
        borderWidth: 1,
        borderColor:"white",
        radius: "70%",
        cutout: "30%",
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: '#7efff5', // Set the color of the data labels
        font: {
          size: 9,
          weight: 'bold',
        },
        formatter: (value) => `${value}%`,
      },
    },
  };

  const data2 = {
    datasets: [
      {
        data: leaveDataProps,
        backgroundColor: ["#175978", "#2183ac", '#00acc1'],
        borderWidth: 1,
        borderColr:'white',
        radius: "70%",
        cutout: "30%",
      },
    ],
  };

  const options2 = {
    plugins: {
      datalabels: {
        display: true,
        color: '#7efff5', // Set the color of the data labels
        font: {
          size: 11,
          weight: 'bold',
        },
        formatter: (value) => `${value}`,
      },
    },
  };

  const ar5 = [
    { status: "Total", icon: "🟣" },
    { status: "Used", icon: "🟠" },
    { status: "Balance", icon: "🟢" },
  ];

  return (
    <div className="w-full flex md:items-center md:justify-center max-md:my-3">
      <div className="flex h-auto gap-4 max-lg:ml-0 w-full items-center justify-evenly max-lg:flex-col">
        <div className="relative w-1/2 max-lg:w-full flex items-center justify-center">
          <div className="shadow-md h-40 flex-col flex bg-gray-100 overflow-hidden w-full rounded-md ">
            <p className="text-4 text-white w-full p-2 text-center top-0 bg-[--common-color] font-semibold ">Your Attendance</p>
            <div className="w-full h-full  flex flex-row">
              <div className="flex flex-col w-3/4 ">
                <div className="flex items-center text-[--common-color] text-center list-none w-full justify-evenly h-1/2">
                  {ar4.map((val, index) => (
                    <li
                      key={index}
                      className=" text-md w-1/2  flex justify-center font-semibold items-center md:text-3"
                    >
                      {val.status}{" "}
                      <span className=" text-[8px] cursor-pointer">{val.icon}</span>
                    </li>
                  ))}
                </div>
                <div className="flex items-center w-full text-center text-[--common-color] list-none justify-evenly h-1/2">
                  {atdProps.map((num, index) => (
                    <li
                      key={index}
                      className="text-xs font-semibold flex w-1/2 justify-around "
                    >
                      <span className="">{num} %</span>
                    </li>
                  ))}
                </div>
              </div>
              <div className="w-1/4 flex items-center justify-center">
                <Doughnut data={data} options={options} className="" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-1/2 max-lg:w-full flex items-center justify-center">
          <div className="shadow-md h-40 flex-col flex bg-gray-100 overflow-hidden pb-0 mt-0 w-full rounded-md  ">
              <p className="text-4 text-white w-full p-2 text-center top-0 bg-[--common-color] font-semibold">Your Leaves</p>
              <div className="w-full h-full flex flex-row">
              <div className="flex flex-col w-3/4 ">
              <div className="flex items-center text-[--common-color] list-none w-full justify-evenly h-1/2">
                {ar5.map((val, index) => (
                  <li
                    key={index}
                    className="text-md flex text-[--common-color] w-1/3 justify-center h-full font-semibold items-center"
                  >
                    {val.status}{" "}
                    <span className=" text-[8px] cursor-pointer">{val.icon}</span>
                  </li>
                ))}
              </div>

              <div className="flex items-center text-[--common-color] list-none w-full justify-evenly h-1/2">
                {leaveDataProps.map((num, index) => (
                  <li
                    key={index}
                    className="text-xs font-semibold w-1/3 items-center flex justify-evenly text-center"
                  >
                    <p className=" w-full text-[10px]">{num} Days</p>
                  </li>
                ))}
              </div>
            </div>
            <div className="w-1/4 flex items-center justify-center">
              <Doughnut data={data2} options={options2} />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveAtendence;