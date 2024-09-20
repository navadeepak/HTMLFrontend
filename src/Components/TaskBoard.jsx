import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
const TaskBoard = () => {
  const [role, setRole] = useState("");
  const [employee_ID, setEmployee_ID] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    task: "",
    status: "",
    taskType: "",
    createdAt: "",
  });
  const handleButtonClick = () => {
    setFormData({
      id: "667d4a482f87aa417442c6be",
      task: "interview: qsis embeed team",
      status: "pending",
      taskType: "low",
      createdAt: "2024-06-27T11:17:28.642Z",
    });
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCloseModal();
  };

  useEffect(() => {
    if(employee){
      setRole(employee.role);
      setEmployee_ID(employee.employee_ID);
    } 
  }, [employee])

  console.lo("role", role);

  return (
    <div className="">
      <div className="flex justify-end mr-5 mt-6">
        <button
          className="flex items-center bg-purple-700 text-white px-3 py-2 rounded-md mt-5"
          onClick={handleButtonClick}
        >
          <FiPlusCircle className="text-xl mr-1" />
          Add new task
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4 text-center uppercase">New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ID:
                </label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Task:
                </label>
                <input
                  type="text"
                  name="task"
                  value={formData.task}
                  onChange={handleChange}
                  className=" border border-gray-400 rounded w-full py-2 px-3 text-gray-700 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Status:
                </label>
                <input
                  type="text"
                  name="status"
                  onChange={handleChange}
                  value={formData.status}
                  className=" border border-gray-400 rounded w-full py-2 px-3 text-gray-700 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Task Type:
                </label>
                <input
                  type="text"
                  name="taskType"
                  value={formData.taskType}
                  onChange={handleChange}
                  className=" border border-gray-400 rounded w-full py-2 px-3 text-gray-700 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Created At:
                </label>
                <input
                  type="text"
                  name="createdAt"
                  value={formData.createdAt}
                  onChange={handleChange}
                  className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 outline-none"
                />
              </div>

              <div className="flex">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-3 py-2 rounded mr-2 w-full"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-700 text-white px-3 py-2 rounded w-full"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
