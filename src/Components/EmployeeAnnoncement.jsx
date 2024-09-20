import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import MobileIcons from "./MobileIcons";
import EmployeeMobileIcons from "./EmployeeMobileIcons";
import { Delete, Edit } from "@mui/icons-material";

function EmployeeAnnoncement({ userRole }) {
  const [newPolicyView, setNewPolicyView] = useState(false);
  const [newPolicyName, setNewPolicyName] = useState("");

  const dummyData = [
    { FileName: "example1.pdf", File: "file1.pdf" },
    { FileName: "example2.docx", File: "file2.docx" },
    { FileName: "example3.jpg", File: "file3.jpg" },
    { FileName: "example4.xlsx", File: "file4.xlsx" },
    { FileName: "example5.png", File: "file5.png" },
    { FileName: "example6.mp4", File: "file6.mp4" },
    { FileName: "example7.csv", File: "file7.csv" },
    { FileName: "example8.txt", File: "file8.txt" },
    { FileName: "example9.pdf", File: "file9.pdf" },
    { FileName: "example10.doc", File: "file10.doc" },
    { FileName: "example11.jpg", File: "file11.jpg" },
    { FileName: "example12.xlsx", File: "file12.xlsx" },
    { FileName: "example13.png", File: "file13.png" },
    { FileName: "example14.mp3", File: "file14.mp3" },
    { FileName: "example15.csv", File: "file15.csv" },
    { FileName: "example16.txt", File: "file16.txt" },
    { FileName: "example17.ppt", File: "file17.ppt" },
    { FileName: "example18.gif", File: "file18.gif" },
    { FileName: "example19.doc", File: "file19.doc" },
    { FileName: "example20.jpg", File: "file20.jpg" },
    { FileName: "example21.jpg", File: "file21.jpg" },
    { FileName: "example22.xlsx", File: "file22.xlsx" },
    { FileName: "example23.png", File: "file23.png" },
    { FileName: "example24.mp3", File: "file24.mp3" },
    { FileName: "example25.csv", File: "file25.csv" },
    { FileName: "example26.txt", File: "file26.txt" },
    { FileName: "example27.ppt", File: "file27.ppt" },
    { FileName: "example28.gif", File: "file28.gif" },
  ];

  const [allPolicy, setAllPolicy] = useState([]);
  const onHide = () => {
    setNewPolicyView(false);
  };

  const handleAdd = () => {
    setAllPolicy([...allPolicy, newPolicyName]);
    setNewPolicyView(false);
  };

  return (
    <div className="flex gap-5 max-lg:flex-col w-full">
      <div
        className={`${
          userRole === "admin" ? "max-sm:flex hidden w-full" : "hidden"
        }`}
      >
        <MobileIcons />
      </div>
      <div
        className={`${
          userRole === "employee" ? "max-sm:flex hidden w-full" : "hidden"
        }`}
      >
        <EmployeeMobileIcons />
      </div>
      <div className=" w-full max-lg:w-full">
        <div className="h-[544px] w-full overflow-hidden rounded-lg border-gray-200 border shadow-sm max-lg:w-full transition-all flex flex-col items-center">
          <div
            className={`${
              userRole === "admin"
                ? "flex flex-row flex-wrap items-center w-full bg-[--common-color] justify-center"
                : "flex flex-row flex-wrap items-center w-full bg-[--common-color] justify-center"
            } gap-2`}
          >
            <h4 className="font-medium text-white text-3xl py-2 sticky top-0">
              Announcements
            </h4>

            {/* sakthi TODO */}
            {userRole === "admin" && (
              <button
                onClick={() => setNewPolicyView(true)}
                className="transform px-6 text-xl shadow-md text-nowrap py-1 m-5 bg-white transition text-[--common-color] rounded-xl"
              >
                Add Policy
              </button>
            )}
          </div>
          <div className="App bg-gray-100 overflow-scroll">
            <div className="flex flex-wrap justify-center ">
              {dummyData.map((file, index) => (
                <div
                  key={index}
                  className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4"
                >
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      {file.FileName}
                    </div>
                    <div className="text-gray-700 text-base flex flex-col items-center justify-between w-full gap-3">
                      <p>
                        <strong>File:</strong>
                        {file.File}
                      </p>
                      <div className="w-full items-center justify-center flex flex-row gap-5">
                        <button className="shadow-[0_0_5px_0] group shadow-gray-400 rounded-xl hover:bg-gradient-to-tr hover:from-[#ff9d70] hover:to-[#ff8d58] duration-200 transition-all">
                          <Edit className="m-1 group-hover:text-white duration-200" />
                        </button>
                        <button className="shadow-[0_0_5px_0] group shadow-gray-400 rounded-xl hover:bg-gradient-to-tr hover:from-[#ff7070] hover:to-[#ff5454] duration-200">
                          <Delete className="m-1 group-hover:text-white duration-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog
        className="w-1/3 h-2/3 bg-gray-900 "
        onHide={onHide}
        draggable={false}
        header="Add Policy Name"
        visible={newPolicyView}
        position="center"
        style={{ width: "25vw", height: "fit-content" }}
      >
        <label className="text-lg">Policy Name : </label>
        <input
          onChange={(e) => {
            setNewPolicyName(e.target.value);
          }}
          className="border-2 border-gray-950 rounded-md h-10 w-full px-2"
        />
        <div className="w-full flex justify-between mt-4">
          <button
            onClick={() => {
              handleAdd();
            }}
            className="bg-[--common-color] text-white rounded-md px-3 py-1 text-lg"
          >
            Add
          </button>
          <button
            onClick={() => handleCancel()}
            className="bg-[--red] text-white rounded-md px-3 py-1 text-lg"
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </div>
  );
}

export default EmployeeAnnoncement;
