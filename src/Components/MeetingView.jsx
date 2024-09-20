import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function MeetingView() {
  const location = useLocation();
  const [meeting, setMeeting] = useState(null); // Initialize as null or an empty object

  useEffect(() => {
    // Check if location.state and data are available
    if (location.state?.data) {
    //   setMeeting(location.state.data);
    setMeeting({
        meeting_type: "Virtual",
        meeting_link: "https://meet.example.com/meeting123",
        date: "2024-09-08",
        start_time: "10:00 AM",
        end_time: "11:00 AM",
        employee_ID: "12345",
        assginby: "67890",
        description: "Team meeting to discuss project updates.",
        domain: "Engineering",
        duration: "1 hour",
        meeting_ID: "fc648c7e-29ad-41b7-a5d3-3d7a961e650a"
      });
    } 
        
    
  }, [location.state]);

  if (!meeting) {
    return <div>Loading...</div>; // Optional: Show a loading state while the meeting data is being set
  }

  return (
    <div className='mt-10'>
      <p className="py-2 px-5 mb-0 max-sm:pl-1 text-2xl text-[--common-color] font-semibold max-sm:text-sm">
        <span className="border-l-4 border-[--common-color] px-4 p-0 flex w-fit h-fit delay-300 duration-300 overflow-hidden">
          <p className="animate-slide p-2">Meeting</p>
        </span>
      </p>

      <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Meeting Details</h2>
        <div className="mb-2">
          <span className="font-semibold">Meeting Type:</span> {meeting.meeting_type}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Meeting Link:</span>{' '}
          <a
            href={meeting.meeting_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {meeting.meeting_link}
          </a>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Date:</span> {meeting.date}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Start Time:</span> {meeting.start_time}
        </div>
        <div className="mb-2">
          <span className="font-semibold">End Time:</span> {meeting.end_time}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Employee ID:</span> {meeting.employee_ID}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Assigned By:</span> {meeting.assginby}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Description:</span> {meeting.description}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Domain:</span> {meeting.domain}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Duration:</span> {meeting.duration}
        </div>
        {/* <div className="mb-4">
          <span className="font-semibold">Meeting ID:</span> {meeting.meeting_ID}
        </div> */}
      </div>

      <div className='w-full flex gap-36 ml-96 mt-4 '>
        <button className='bg-blue-600 py-1 px-4 rounded-lg'>back</button>
        <button className='bg-blue-600 py-1 px-4 rounded-lg'>Edit</button>
        <button className='bg-blue-600 py-1 px-4 rounded-lg'>Delete</button>
      </div>
    </div>
  );
}

export default MeetingView;