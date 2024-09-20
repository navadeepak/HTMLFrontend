// import { useState } from "react";
// import StatisticsData from "./StatisticsData.jsx";
// import StatisticsData2 from "./StatisticsData2.jsx";

// const PerformanceGraph = () => {
//   const [WeekData, setWeekData] = useState("This Week");

//   return (
//     <div className="relative rounded-[20px]  w-[98%] ml-4  bg-purple-100 shadow-dark-md mt-[20px] mb-[20px]">
//       <div className="absolute top-[10px] left-[94px] text-[13px] font-bold">
//         Employee Performance Score
//       </div>

//       <form
//         action=""
//         className="absolute text-[12px] right-1 top-[10px] w-[100px] "
//       >
//         <select
//           name=""
//           id=""
//           className="text-[10px] border rounded-[2px] border-black bg-transparent "
//           onChange={(e) => {
//             const currentWeek = e.target.value;
//             setWeekData(currentWeek);
//           }}
//         >
//           <option value="This Week">This Week</option>
//           <option value="Previous Week">Previous Week</option>
//         </select>
//       </form>

//       {WeekData == "This Week" ? <StatisticsData /> : <StatisticsData2 />}
//     </div>
//   );
// };

// export default PerformanceGraph;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin
import { color } from 'highcharts';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels); // Register the plugin

const HorizontalBarChart = ({ barchartdata }) => {
  const data = {
    labels: ['Total Tasks', 'Completed Tasks', 'Pending Tasks', 'In-Progress Tasks'],
    datasets: [
      {
        label: 'Tasks',
        data: barchartdata,
        backgroundColor: ['#227093', '#00acc1', '#3949ab', '#0097e6'],
      },
    ],
  };

  const options = {
    indexAxis: 'y',  // This will make the bar chart horizontal
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display:false,
      },
      title: {
        display: false,
        text: 'Employee Task Details',
      },
      datalabels: {
        color: '#fff', // Change this to your desired color
        font:{
          size:12
        },
        
        formatter: (value) => value, // Format the value if needed
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid lines on the x-axis
        },
        ticks: {
          font: {
            size: 12, 
            weight:600,// Change the font size for x-axis labels
          },
          color:'#273c75',
        },
      },
      y: {
        grid: {
          display: false, // Remove grid lines on the y-axis
        },
        ticks: {
          font: {
            size: 10, // Change the font size for y-axis labels
            weight:700
          },
          color:'#273c75',
        },
      },
    },
  };

  return (
    <div className=' w-11/12  h-auto   mt-12 m-auto '>
      
      <Bar data={data} options={options}  />
    </div>
  );
};

export default HorizontalBarChart;