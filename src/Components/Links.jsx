import React, { useState, useRef, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import userAvatar from "../assets/avatar.webp";
import PdfUploader from "./PdfUploader";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { MdEditSquare } from "react-icons/md";
import { TbAlertCircle } from "react-icons/tb";
import { LuExternalLink } from "react-icons/lu";

// Popup Form Component for Adding Links
const AddLinkForm = ({ onClose, onAdd }) => {
  const [linkName, setLinkName] = useState("");
  const formRef = useRef(null);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(linkName);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        ref={formRef}
        className="bg-white p-4 rounded shadow-lg max-w-xs w-full relative"
      >
        <h2 className="text-lg font-semibold mb-4">Add New Policy</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Policy Name
            </label>
            <input
              type="text"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 text-sm py-2 bg-[--common-color] text-white rounded"
            >
              Add New Policy
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 text-sm py-2 bg-[--red] text-white rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Form Component
const EditLinkForm = ({ link, onClose, onSave }) => {
  const [linkName, setLinkName] = useState(link.linkName);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const formRef = useRef(null);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setError("Only PDF files are allowed");
      return;
    }
    const file = acceptedFiles[0];
    setPdfFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
    maxFiles: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", linkName);
    if (pdfFile) {
      formData.append("file", pdfFile);
    }

    try {
      await axios.put(
        `http://localhost:3001/files/update-files/${link._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSave(link._id, linkName, pdfFile);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        ref={formRef}
        className="bg-white p-4 rounded shadow-lg max-w-xs w-full relative"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Policy</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Policy Name
            </label>
            <input
              type="text"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <div
              {...getRootProps({
                className:
                  "dropzone p-4 rounded-md border-dashed border-2 border-gray-300",
              })}
            >
              <input {...getInputProps()} />
              <p className="text-xs text-gray-600">
                Choose PDF file (optional)
              </p>
              {pdfFile && (
                <p className="mt-2 text-xs text-gray-700">{pdfFile.name}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 text-sm py-2 bg-[--red] text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 text-sm py-2 bg-[--green] text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Links Component
function Links({ userRole }) {
  const [pdfBackendData, setPdfBackendData] = useState([]);
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [links, setLinks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(null); // New state for editing
  const [linkNameForUpload, setLinkNameForUpload] = useState(null);
  const [newlyAddedLinkIds, setNewlyAddedLinkIds] = useState([]); // Track newly added link IDs
  //console.log(userRole, "roll");

  const getPdf = async () => {
    try {
      const response = await axios.get("http://localhost:3001/files/get-files");
      const filteredData = response.data.data
        .filter((item) => item.Dashboard_file[0].title)
        .map((item) => ({
          _id: item._id,
          pdf_id: item.Dashboard_file[0]._id,
          linkName: item.Dashboard_file[0].title,
          pdfUrl: item.Dashboard_file[0].pdf
            ? `http://localhost:3001/files/${item.Dashboard_file[0].pdf}`
            : "",
        }));

      setPdfBackendData(filteredData);
      // console.log("pdf data",filteredData)
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  };

  const deletePolicy = async (link_id, title) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the policy: ${title}?`
    );

    if (!isConfirmed) {
      // If user cancels, exit the function
      return;
    }
    // console.log("link_id",link_id)
    // console.log("title",title)
    try {
      const response = await axios.delete(
        `http://localhost:3001/files/delete-file/${link_id}`
      );
      // console.log("File deleted successfully", response.data);
      toast.success("Policy deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete the Policy");
    }
  };

  useEffect(() => {
    getPdf();
  }, []);

  useEffect(() => {
    setLinks(pdfBackendData);
  }, [pdfBackendData]);

  const handleUpload = (fileName, linkName) => {
    const newPdfUrl = `http://localhost:3001/files/${fileName}`;
    setLinks(
      links.map((link) =>
        link.linkName === linkName ? { ...link, pdfUrl: newPdfUrl } : link
      )
    );
    setSelectedLinkId(null);
    setNewlyAddedLinkIds((prev) => prev.filter((id) => id !== linkName)); // Remove from newly added IDs
  };

  const handleSelectLink = (linkName) => {
    setSelectedLinkId(linkName);
    setLinkNameForUpload(linkName);
    // console.log("link  name id",linkName)
    // console.log("link  name upload",linkNameForUpload)
  };

  const handleAddLink = (linkName) => {
    const newLink = {
      _id: Math.max(0, ...links.map((link) => link._id)) + 1,
      linkImg: userAvatar,
      linkName: linkName,
      pdfUrl: "",
    };
    setLinks([...links, newLink]);
    setSelectedLinkId(newLink.linkName);
    setLinkNameForUpload(linkName);
    setNewlyAddedLinkIds((prev) => [...prev, newLink.linkName]); // Add to newly added IDs
    setShowAddForm(false);
  };

  const handleEdit = async (linkId, updatedTitle, file) => {
    const formData = new FormData();
    formData.append("title", updatedTitle);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.put(
        `http://localhost:3001/files/update-files/${linkId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update link data
      const updatedLinks = links.map((link) =>
        link._id === linkId
          ? {
              ...link,
              linkName: updatedTitle,
              pdfUrl: file
                ? `http://localhost:3001/files/${file.name}`
                : link.pdfUrl,
            }
          : link
      );
      setLinks(updatedLinks);
      setShowEditForm(null);
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };
  // console.log("backend data:::",links);

  return (
    <div className="border-[1px] min-h-[85vh] w-full max-lg:w-full max-md:m-0 transition-all flex flex-col items-center overflow-hidden">
      <div
        className={`${
          userRole === "admin" ? "flex flex-col  items-center" : ""
        } px-2 w-full  flex flex-row justify-center items-center`}
      >
        <h4 className="first-letter:text-[--common-color] font-medium  text-black text-6xl text-center">
          Announcements
        </h4>
        {userRole === "admin" && (
          <button
            onClick={() => setShowAddForm(true)}
            className="transform px-6 text-xl shadow-md py-1 m-5 bg-[--common-color] hover:bg-white hover:text-black transition text-white rounded"
          >
            Add Policy
          </button>
        )}
      </div>
      <div className="w-full p-2 overflow-scroll">
        <div className="w-full mt-5 justify-items-center grid grid-cols-2 gap-10 max-xl:grid-cols-2 max-lg:grid-cols-1">
          {links.map((link) => (
            <div
              className={`${
                userRole === "admin"
                  ? "group h-[50px] group/slid overflow-hidden flex flex-row hover:w-2/3 max-md:hover:w-full w-3/6 duration-200 transition-all"
                  : "h-[50px] w-3/6"
              } bg-white max-md:w-full border-[1px] p-2 border-[--bg-gray] flex items-center shadow-md rounded-md`}
            >
              <div
                key={link._id}
                className="group w-full h-full flex hover:flex-row items-center "
              >
                <div className=" flex items-center justify-center h-full w-full">
                  <a
                    href={link.pdfUrl || "#"}
                    className={`text-xl gap-2 hover:underline px-4 py-2 rounded-md w-full flex-row justify-center group-hover:text-[--blue] ${userRole==="admin"?"group-hover:justify-start":"justify-center"} text-center text-wrap duration-150 flex font-normal items-center`}
                  >
                    <p className="capitalize">{link.linkName}</p>
                  </a>
                </div>
                <div className="group-hover:hidden max-md:hidden">
                  <TbAlertCircle />
                </div>
                <div
                  className={
                    userRole === "admin"
                      ? "w-full h-full group-hover:flex overflow-hidden hidden relative items-center justify-center"
                      : "hidden"
                  }
                >
                  {userRole === "admin" &&
                  newlyAddedLinkIds.includes(link.linkName) ? (
                    selectedLinkId === link.linkName ? (
                      <PdfUploader
                        onUpload={(fileName) =>
                          handleUpload(fileName, linkNameForUpload)
                        }
                        linkName={linkNameForUpload}
                      />
                    ) : (
                      <button
                        onClick={() => handleSelectLink(link.linkName)}
                        className="mr-0 w-fit bg-[--common-color] p-1 text-xs text-white rounded"
                      >
                        Add Policy document
                      </button>
                    )
                  ) : (
                    userRole === "admin" && (
                      <div className="flex items-center justify-end gap-2 h-full">
                        <button
                          onClick={() => setShowEditForm(link)}
                          className="group-hover/slid:flex hidden max-md:flex w-fit px-2 py-1  text-lg rounded transition bg-[--blue] text-white shadow-md items-center justify-center hover:scale-105 duration-200"
                        >
                          <MdEditSquare className="text-center text-2xl hover:scale-105 transition" />
                        </button>
                        <button
                          className="group-hover/slid:flex hidden max-md:flex w-fit px-2 py-1 text-lg rounded transition bg-[--red] text-white shadow-md items-center justify-center hover:scale-105 duration-200"
                          onClick={() =>
                            deletePolicy(link.pdf_id, link.linkName)
                          }
                        >
                          <RiDeleteBin6Line className="text-center text-2xl hover:scale-105 transition" />
                        </button>
                        <a
                          href={link.pdfUrl || "#"}
                          className="group-hover/slid:flex hidden max-md:flex w-fit px-2 py-1 text-lg rounded transition bg-[--green] text-white shadow-md items-center justify-center hover:scale-105 duration-200"
                        >
                          <LuExternalLink className="text-center text-2xl hover:scale-105 transition" />
                        </a>
                      </div>
                    )
                  )}
                  {userRole === "employee" && link.pdfUrl ? (
                    <a
                      href={link.pdfUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-2 p-1 bg-[--blue] text-xs text-white shadow-md transition hover:scale-105 duration-200 rounded"
                    >
                      View PDF
                    </a>
                  ) : link.pdfUrl === "" ? (
                    <p className="text-xs"></p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showAddForm && (
        <AddLinkForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddLink}
        />
      )}
      {showEditForm && (
        <EditLinkForm
          link={showEditForm}
          onClose={() => setShowEditForm(null)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
}

export default Links;
