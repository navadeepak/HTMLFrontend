import React from 'react';
import { Bubble, Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const AdminPieChart = ({ newData }) => {
  //console.log('Data received in AdminPieChart:', newData);
  const sum = newData.reduce((acc, curr) => acc + curr, 0);

  const chartData = {
    labels: [
      `Frontend - ${newData[0]}`,
      `Full-stack Node.JS / React.js Developer - ${newData[1]}`,
      `Mobile Application Developer - ${newData[2]}`,
      `Embedded Engineer - ${newData[3]}`,
      `AI / ML Engineer - ${newData[4]}`,
      `Cloud Engineer - ${newData[5]}`,
      `Intern Full-stack Node.js / React.js Developer - ${newData[6]}`,
      `Intern Mobile Application Developer Trainee - ${newData[7]}`,
      `Intern Embedded Engineer Trainee - ${newData[8]}`,
      `Intern AI / ML Trainee - ${newData[9]}`,
      `Intern Cloud Engineer Trainee - ${newData[10]}`,
      `Backend - ${newData[11]}`,
      `Others - ${newData[12]}` ,
    ],
    datasets: [
      {
        label: 'Number of Employees',
        data: newData,
        radius: "100%",
        cutout: "45%",
        backgroundColor: [
          '#ffd700', // Yellow
          '#009688', // Teal
          '#00acc1', // Cyan
          '#3949ab', // Blue        
          '#b39ddb', // Light Purple
          '#388e3c', // Dark Green
          '#ff5722', // Deep Orange
          '#4fc3f7', // Light Blue
          '#ff7800', // Orange
          '#d9006d', // Magenta
          '#a70055', // Dark Pink
          '#747d8c', // Light Gray  
          '#10ac84', // Teal
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        align: 'start',
        // outerWidth:100,
        labels: {
          font: {
            size: 15,
            weight: "bold",
          },
          boxWidth: 30,
         boxBorder:0,
          padding: 18,
          
          color: (context) => {
            return chartData.datasets[0].backgroundColor[context.index];
          },
          
        },
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        color: 'black',
        font: {
          size: 20,
          weight: "bold",
        },
        formatter: (value) => {
          return `${value}`; // Display the value (employee count) on the chart segment
        },
      },
    },
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-[#00000079] z-50 '>

    <div className='w-4/5 h-f rounded-md bg-white z-50 absolute max-xl:w-full'>
      <h2 className='text-center bg-[--common-color] rounded-t-md py-2 text-white w-full font-bold'>
        Staff Distribution Analysis
      </h2>
      <div className='chart-container relative w-full overflow-scroll z-50 mt-5 h-96 px-3 cursor-pointer flex items-center justify-center'>
        <Doughnut data={chartData} options={options} className='' />
        {/* <div className='relative top-0 z-0 inset-0 pr-2 flex items-center justify-center'> */}
          {/* <div className='absolute text-center z-0 bg-transparent rounded-full h-32 py-3 px-2 mr-80 mb-96 '> */}
            {/* <h3 className='text-sm font-bold text-gray-800 mt-6 w-28 text-wrap max-xl:hidden'>Employee <p className='text-green-500'>Management</p> System</h3> */}
          {/* </div> */}
        {/* </div> */}
      </div>
      <p className='p-1 my-2 font-semibold border-[--common-color] text-center w-1/3 m-auto text-white text-xl mt-4 bg-[--common-color]'>
        Total Employees: {sum}
      </p>
    </div>
    </div>
  );
};

export default AdminPieChart;
