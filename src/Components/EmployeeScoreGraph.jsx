import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export default function EmployeeScoreGraph({scoreProps}) {
  // Static data for the single bar chart
  const chartData = {
    labels: ['Days Active', 'Done Projects', 'Days Off'],
    datasets: [
      {
        label: 'Number of Days',
        data: scoreProps, // Static values
        backgroundColor: ['#227093', '#341f97', '#00cec9'],
        borderColor: '#000',
        borderWidth: 0,
        barThickness: 35, // Adjust this value to reduce or increase the bin width
        maxBarThickness: 40,
      },
    ],
  };

  // Chart options
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
        color: '#f7f1e3',
        font: {
          size: 10,
        },
        formatter: (value) => `${value}`,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: true,
          width: 1,
          color: '#030d1f',
        },
        ticks: {
          color: '#000',
          font: {
            weight: 'bold',
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        border: {
          display: true,
          width: 1,
          color: '#030d1f',
        },
        ticks: {
          precision: 0,
          color: '#000',
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className='w-full mt-5 relative bg-gray-100 p-4'>
      <div className='w-full max-w-lg ml-5 mx-auto'>
        <div className='w-5/6 h-36'>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
