import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels); // Register the plugin

const HorizontalBarChart = ({ barchartdata }) => {
  const data = {
    labels: ['TOTAL TASK', 'COMPLETED TASK', 'IN-PROGRESS TASK' , 'PENDING TASK'],
    datasets: [
      {
        label: 'Tasks',
        data: barchartdata,
        backgroundColor: ['#227093', '#00acc1', '#3949ab', '#0097e6'],
        barThickness: 30, // Adjust this value to reduce or increase the bin width
        maxBarThickness: 40,
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
            size: 12, // Change the font size for y-axis labels
            weight:700
          },
          color:'#273c75',
        },
      },
    },
  };

  return (
    <div className='w-full h-[230px] p-2 flex items-center justify-center'>
      <Bar data={data} options={options} className='flex ' />
    </div>
  );
};

export default HorizontalBarChart;
