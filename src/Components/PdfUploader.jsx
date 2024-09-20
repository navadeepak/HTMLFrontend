// // import React, { useState } from 'react';
// // import { useDropzone } from 'react-dropzone';
// // import axios from 'axios';

// // const PdfUploader = () => {
// //   const [pdfFile, setPdfFile] = useState(null);
// //   const [error, setError] = useState('');
// //   const [uploadStatus, setUploadStatus] = useState('');

// //   const onDrop = (acceptedFiles, fileRejections) => {
// //     setError('');
// //     if (fileRejections.length > 0) {
// //       setError('Only PDF files are allowed');
// //       return;
// //     }

// //     const file = acceptedFiles[0];
// //     setPdfFile(file);
// //   };

// //   const { getRootProps, getInputProps } = useDropzone({
// //     onDrop,
// //     accept: 'application/pdf',
// //     maxFiles: 1,
// //   });

// //   const handleUpload = async () => {
// //     if (pdfFile) {
// //       const formData = new FormData();
// //       formData.append('file', pdfFile);

// //       try {
// //         // Replace with your actual POST URL
// //         const response = await axios.post('http://localhost:3001/files/upload-files', formData, {
// //           headers: {
// //             'Content-Type': 'multipart/form-data',
// //           },
// //         });

// //         setUploadStatus('Upload successful');
// //         console.log(response.data);
// //       } catch (error) {
// //         setUploadStatus('Failed to upload file');
// //         console.error('Error uploading file:', error);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="pdf-uploader">
// //       <div {...getRootProps({ className: 'dropzone' })}>
// //         <input {...getInputProps()} />
// //         <p>Drag 'n' drop a PDF file here, or click to select one</p>
// //       </div>
// //       {pdfFile && <p>Selected file: {pdfFile.name}</p>}
// //       {error && <p className="error">{error}</p>}
// //       <button onClick={handleUpload} disabled={!pdfFile}>
// //         Upload PDF
// //       </button>
// //       {uploadStatus && <p>{uploadStatus}</p>}
// //     </div>
// //   );
// // };

// // export default PdfUploader;


// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// const PdfUploader = ({ onUpload, linkName }) => {
//   const [pdfFile, setPdfFile] = useState(null);
//   const [error, setError] = useState('');
//   const [uploadStatus, setUploadStatus] = useState('');

//   const onDrop = (acceptedFiles, fileRejections) => {
//     setError('');
//     setUploadStatus(''); // Clear upload status on new file selection

//     if (fileRejections.length > 0) {
//       setError('Only PDF files are allowed');
//       return;
//     }

//     const file = acceptedFiles[0];
//     setPdfFile(file);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: 'application/pdf',
//     maxFiles: 1,
//   });

//   const handleUpload = async () => {
//     if (pdfFile) {
//       const formData = new FormData();
//       formData.append('file', pdfFile);
//       formData.append('title', linkName); // Use linkName here

//       try {
//         const response = await axios.post('http://localhost:3001/files/upload-files', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         setUploadStatus('Upload successful');
//         onUpload(response.data.fileName); // Pass file name to parent component
//         setPdfFile(null);
//       } catch (error) {
//         setUploadStatus('Failed to upload file');
//         console.error('Error uploading file:', error);
//       }
//     } else {
//       setError('No file selected');
//     }
//   };

//   return (
//     <div className="pdf-uploader p-4 rounded-md">
//       <div {...getRootProps({ className: 'dropzone p-4 rounded-md' })}>
//         <input {...getInputProps()} />
//         <p className='text-xs text-gray-600'>Choose Policy</p>
//         <button
//           className='mt-2 p-1 bg-blue-500 text-xs text-white rounded'
//           onClick={handleUpload}
//           disabled={!pdfFile}
//         >
//           Upload PDF
//         </button>
//       </div>
//       {pdfFile && <p className='mt-2 text-xs mt-0 text-gray-700'>{pdfFile.name}</p>}
//       {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
//       {uploadStatus && <p className='mt-2 text-xs text-green-500'>{uploadStatus}</p>}
//     </div>
//   );
// };

// export default PdfUploader;

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { IoCloudUploadSharp } from "react-icons/io5";

const PdfUploader = ({ onUpload, linkName }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const onDrop = (acceptedFiles, fileRejections) => {
    setError('');
    setUploadStatus(''); // Clear upload status on new file selection

    if (fileRejections.length > 0) {
      setError('Only PDF files are allowed');
      return;
    }

    const file = acceptedFiles[0];
    setPdfFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf',
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (pdfFile) {
      const formData = new FormData();
      formData.append('file', pdfFile);
      formData.append('title', linkName); // Use linkName here

      try {
        const response = await axios.post('http://localhost:3001/files/upload-files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setUploadStatus('Upload successful');
        window.location.reload();
        onUpload(response.data.fileName); // Pass file name to parent component
        setPdfFile(null);
      } catch (error) {
        setUploadStatus('Failed to upload file');
        console.error('Error uploading file:', error);
      }
    } else {
      setError('No file selected');
    }
  };

  return (
    <div className="pdf-uploader p-4 rounded-md">
      <div {...getRootProps({ className: 'dropzone p-2 rounded-md flex items-center align-center bg-white w-full gap-5 border-2 border-dashed border-gray-600 justify-center' })}>
        <input {...getInputProps()} />
        <p className='mt-2 p-1 bg-green-500 hover:bg-green-600 transition text-[10px] text-white rounded text-center cursor-pointer'>Choose PDF</p>
        <p className='block text-center'>
        <IoCloudUploadSharp className='text-md mt-1 text-center m-auto cursor-pointer' />
        <span className='text-xs'>Choose</span>
        {pdfFile && <p className='mt-0 text-[9px] text-gray-700'>{pdfFile.name}</p>}
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </p>
        <button
          className='mt-2 p-1 bg-blue-500 text-xs text-white rounded cursor-pointer'
          onClick={handleUpload}
          disabled={!pdfFile}
        >
          Upload 
        </button>
       
      </div>
   
      
      {uploadStatus && <p className='mt-2 text-xs text-green-500'>{uploadStatus}</p>}
    </div>
  );
};

export default PdfUploader;