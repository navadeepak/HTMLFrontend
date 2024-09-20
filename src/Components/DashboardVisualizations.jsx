
import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// Custom plugin to apply blur effect
const blurPlugin = {
  id: 'blurPlugin',
  beforeDraw: (chart) => {
    const { ctx } = chart;
    ctx.save();
    ctx.filter = 'blur(4px)';
  },
  afterDraw: (chart) => {
    const { ctx } = chart;
    ctx.restore();
  },
};

export default function DashboardVisualizations({ gData }) {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className='w-full relative bg-white'>
      <div className="w-full mx-10 m-auto">
        <button 
          onClick={scrollLeft} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-xl h-1/2 p-2 hover:bg-[--common-color] hover:text-white duration-200"
        >
          <IoIosArrowBack />
        </button>
        <div 
          ref={containerRef} 
          className="overflow-x-scroll overflow-y-hidden border-0 flex flex-row bg-white p-2 box-border scroll-smooth"
        >
          {Object.keys(gData).map((workRole, index) => {
            const { 
              task_board_Completed, 
              task_board_In_progress, 
              task_board_to_do 
            } = gData[workRole];

            const chartData = {
              labels: ['Completed', 'In Progress', 'To Do'],
              datasets: [
                {
                  label: 'Number of Tasks',
                  data: [task_board_Completed, task_board_In_progress, task_board_to_do],
                  backgroundColor: ['#9ba8ae', '#92cad1', '#778da9'],
                  borderColor: '#000',
                  borderWidth: 0,
                  barThickness: 35, // Adjust this value to reduce or increase the bin width
                  maxBarThickness: 40,
                  
                },
              ],
            };

            const options = {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                  position: 'top',
                  labels: {
                    font: {
                      size: 12,
                      weight: 'bold',
                    },
                    boxWidth: 20,
                    padding: 18,
                    color: '#030d1f',
                  },
                },
                tooltip: {
                  enabled: true,
                },
                datalabels: {
                  color: 'black',
                  font: {
                    size: 16,
                    weight:'bold',
                  },
                  align: 'end', // Aligns the label to the end of the bar (top for vertical bars)
                  //
                   anchor: 'end', 
                   padding: {
                   top: -15, 
                   bottom: 0,
                   left:20
                   // Adds margin below the labels
                  },
                  
                  margin:{
                    top: 0, // Adds margin below the labels
                  },
                  formatter: (value) => `${value} Task`,
                },
                blurPlugin, // Add the custom blur plugin here
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  border: {
                    display: true,
                    width: 2,
                    color: '#030d1f',
                  },
                  ticks: {
                    color: '#000',
                    font: {
                      weight: 'bold',
                      size: 20,
                    },
                  },  
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0,
                  },
                  grid: {
                    display: false,
                  },
                  border: {
                    display: true,
                    width: 2,
                    color: '#030d1f',
                  },
                  ticks: {
                    color: '#000',
                    font: {
                      weight: 'bold',
                      size:20
                    },
                  },
                },
              },
            };

            return (
              <div
                key={index}
                className="w-fit flex mr-10 flex-col gap-2 border shadow-md rounded-md text-center box-border"
              >
                <h3 className="text-xl px-2 text-nowrap font-bold h-10  flex items-center justify-center text-center w-full bg-[--teal-lite] text-white py-1 rounded-t-md">
                  {workRole || "Nill"}
                </h3>
                <div className='min-w-[500px] h-[250px]'>
                  <Bar data={chartData} options={options} />
                </div>
              </div>
            );
          })}
        </div>
        <button 
          onClick={scrollRight} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[--common-color] text-xl h-1/2 p-2 hover:text-white duration-200"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}