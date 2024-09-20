import React from 'react'
import EmployeeScoreGraph from './EmployeeScoreGraph'



import { RiLineChartFill } from "react-icons/ri";

export default function WorkingDays({scoreProps,score}) {
  return (
    <div className="w-1/2 max-lg:w-full max-lg:h-[300px] h-1/4 flex flex-col items-center rounded-md shadow-md border-t-4 border-[--common-color]">

      <div className="w-full h-[40px]  flex flex-row justify-evenly items-center bg-[--common-color]">
        <h4 className="text-base items-center gap-2 w-44 font-semibold flex justify-center text-center text-white">
            Your Score 
           
            <RiLineChartFill className='text-md font-blod text-xl' />
        </h4>
       </div>
       <div className="w-full h-[260px] bg-gray-100">
        <EmployeeScoreGraph  scoreProps={scoreProps}/>
        <div className='flex items-center'>
            <div className='w-40  m-auto bg-[--teal-lite] p-1  gap-2 text-center rounded'>
                <p className='font-bold ml-1 text-center text-white text-sm' >Total Score:  10</p>
              </div>

              <div className='w-40  m-auto bg-[--teal-lite] text-white p-1  gap-2 text-center rounded'>
                <p className='font-bold ml-1 text-center text-sm' >Your Score:  {score}</p>
              </div>
        </div>
      </div>
      
    </div>
  )
}