import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/employees/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Fetch Employees error:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((data) => (
            <tr key={data._id}>
              <td>{data.details.date}</td>
              <td>{data.checkIn}</td>
              <td>{data.checkOut}</td>
              <td>{/* Action button or link */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;
