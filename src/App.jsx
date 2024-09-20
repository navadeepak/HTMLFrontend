import React, { useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Components/SideBar";
import AllEmployee from "./Components/AllEmployee";
import TaskBoard from "./Components/TaskBoard";
import Projects from "./Components/Projects";
import Attendance from "./Components/Attendance";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import ToDos from "./Components/Todos";
import Leave from "./Components/Leave";
import AddNewEmployee from "./Components/AddNewEmployee";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import SignUpSignIn from "./pages/SignUpSignIn";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
// import Tickets from "./Components/Tickets";
import EditEmployees from "./Components/EditEmployees";
import Details from "./Components/Details";
import EmployeeAttendance from "./Components/EmployeeAttendance";
// import DashboardCalendarAdmin from "./Components/DashboardCalenderAdmin";
import Meeting from "./Components/Meeting";
import Inventory from "./Components/Inventory";

import { AttendanceProvider } from "./context/AttendanceContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { AllEmployeeProvider } from "./context/AllEmployeeContext";
import Tickets from "./Components/Tickets";
import Holidays from "./Components/Holidays";
const App = () => {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("user") !== null;

  const isAuthRoute = ["/", "/reset", "/changepwd"].includes(location.pathname);

  const [sideBarHide, setSideBarHide] = useState("");

  const isVisibility =
    (location.pathname.startsWith("/auth") || isAuthRoute) && isLoggedIn;

  return (
    <PrimeReactProvider>
      <AllEmployeeProvider>
        <AttendanceProvider>
          <EmployeeProvider>
            <div className="flex flex-col h-screen">
              {isVisibility && !isAuthRoute && <Navbar />}
              <div
                className={` w-full h-[90vh] flex ${
                  isAuthRoute ? "" : "with-sidebar"
                }`}
              >
                {isVisibility && !isAuthRoute && <Sidebar className="" />}
                <div className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<SignUpSignIn />} />
                    <Route path="/reset" element={<ResetPassword />} />
                    <Route path="/changepwd" element={<ChangePassword />} />
                    <Route
                      path="/auth/dashboard"
                      element={
                        <ProtectedRoute
                          element={<Dashboard />}
                          allowedRoles={["Admin", "Employee"]}
                        />
                      }
                    />
                    {/* this is comment */}
                    <Route
                      path="/auth/employee"
                      element={
                        <ProtectedRoute
                          element={<AllEmployee />}
                          allowedRoles={["Admin"]}
                        />
                      }
                    />
                    <Route
                      path="/auth/task_board"
                      element={
                        <ProtectedRoute
                          element={<TaskBoard />}
                          allowedRoles={["Admin", "Employee"]}
                        />
                      }
                    />
                    <Route
                      path="/auth/projects"
                      element={
                        <ProtectedRoute
                          element={<Projects />}
                          allowedRoles={["Admin"]}
                        />
                      }
                    />
                    <Route
                      path="/auth/attendance/:id"
                      element={
                        <ProtectedRoute
                          element={<Attendance />}
                          allowedRoles={["Admin","Employee"]}
                        />
                      }
                    />
                    <Route
                      path="/auth/todos"
                      element={
                        <ProtectedRoute
                          element={<ToDos />}
                          allowedRoles={["Admin"]}
                        />
                      }
                    />
                    <Route
                      path="/auth/leave"
                      element={
                        <ProtectedRoute
                          element={<Leave />}
                          allowedRoles={["Admin", "Employee"]}
                        />
                      }
                    />
                    <Route
                      path="/auth/ticket/"
                      element={
                        <ProtectedRoute
                          element={<Tickets />}
                          allowedRoles={["Admin", "Employee"]}
                        />
                      }
                    />
                    <Route
                      path="/auth/addNewEmployee"
                      element={
                        <ProtectedRoute
                          element={<AddNewEmployee />}
                          allowedRoles={["Admin"]}
                        />
                      }
                    />
                    <Route
                      path="/auth/editEmployee/:employee_ID"
                      element={
                        <ProtectedRoute
                          element={<EditEmployees />}
                          allowedRoles={["Admin"]}
                        />
                      }
                    />
                    <Route
                      path="/auth/details/:employee_ID"
                      element={
                        <ProtectedRoute
                          element={<Details />}
                          allowedRoles={["Admin"]}
                        />
                      }
                    />
                    <Route
                    path="/auth/employeeAttendance"
                    element={
                      <ProtectedRoute
                        element={<EmployeeAttendance />}
                        allowedRoles={["Admin"]}
                      />
                    }
                  /> 
                  <Route
                    path="/auth/Meeting"
                    element={
                      <ProtectedRoute
                        element={<Meeting />}
                        allowedRoles={["Admin","Employee"]}
                      />
                    }
                  /> 
                  <Route
                  path="/auth/Inventory"
                  element={
                    <ProtectedRoute
                      element={<Inventory />}
                      allowedRoles={["Admin"]}
                    />
                  }
                /> 
                  {/* <Route
                  path="/auth/Chat"
                  element={
                    <ProtectedRoute
                      element={<Chat />}
                      allowedRoles={["Admin","Employee"]}
                    />
                  }
                />  */}
                <Route
                  path="/auth/holiday/"
                  element={
                    <ProtectedRoute
                      element={<Holidays />}
                      allowedRoles={["Admin", "Employee"]}
                    />
                  }
                  />


                  </Routes>
                </div>
              </div>
            </div>
          </EmployeeProvider>
        </AttendanceProvider>
        </AllEmployeeProvider>
      
    </PrimeReactProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

export default AppWrapper;

