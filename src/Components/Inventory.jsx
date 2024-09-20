
// import React, { useEffect, useState } from 'react'

// import { FaAngleRight, FaArrowLeftLong, FaMoneyBillTrendUp } from "react-icons/fa6";
// // import { FaArrowLeftLong } from 'react-icons/fa6'
// import axios from "./utilities/axiosInstance";

// function Inventory() {
//   const [newPurchaseview,setNewPurchaseView]=useState("hidden");
//   const [purchaseHistroyView,setPurchaseHistroyView]=useState("hidden");
//   const [purchaseDetailsView,setPurchaseDetailsView]=useState("hidden");
//   const [billView,setBillView]=useState("hidden");
//   const [OneproductView,setOneProductView]=useState ("hidden");
//   const [OneproductDetailsView,setOneProductDetailsView]=useState("hidden")
//   const [productEditView,setProductEditView]=useState("hidden")

//   const [purchases, setPurchases] = useState([]);
//   const [oneDayPurchase,setoneDayPurchase]=useState(null);
//   const [oneDayBill,setOneDayBill]=useState(null);

//   const [productDetails,setProductDetails]=useState([{}]);
//   const [productSupplier,setProductSupplier]=useState(null);
//   const [purchaseDate,setPurchaseDate]=useState(null);
//   const [purchase_ID,setpurchase_ID]=useState(null);
//   const [bill,setBill]=useState(null);
//   const [billURL,setBillURL]=useState(null);
//   const [selectedProducts, setSelectedProducts] = useState();
//   const [availableStack,setAvailableStack]=useState();
//   const [distributed,setDistributed]=useState();

//   const [selectedProduct,setSelectedProduct]=useState()

//   const [alldevice,setAllDevice]=useState("");
//   const [deviceList,setDeviceList]=useState(" ")
  

    

//   const productOptions = {
//     "products": [
//       { "value": "default", "label": "Select Product" },
//       { "value": "laptop", "label": "Laptop" },
//       { "value": "desktop", "label": "Desktop" },
//       { "value": "keyboard", "label": "Keyboard" },
//       { "value": "mouse", "label": "Mouse" },
//       { "value": "cpu", "label": "CPU" },
//       { "value": "camera", "label": "Camera" },
//       { "value": "router", "label": "Router" },
//       { "value": "desk-chair", "label": "Desk Chair" },
//       { "value": "stool", "label": "Stool" },
//       { "value": "plastic-chair", "label": "Plastic Chair" },
//       { "value": "printer", "label": "Printer" },
//       { "value": "others", "label": "Others" }
//     ]
//   };

//   const brandOptions = {
//     "laptop": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "dell", "label": "Dell" },
//       { "value": "hp", "label": "HP" },
//       { "value": "lenovo", "label": "Lenovo" },
//       { "value": "apple", "label": "Apple" },
//       { "value": "asus", "label": "Asus" },
//       { "value": "acer", "label": "Acer" },
//       { "value": "msi", "label": "MSI" },
//       { "value": "microsoft", "label": "Microsoft" },
//       { "value": "samsung", "label": "Samsung" },
//       { "value": "razer", "label": "Razer" }
//     ],
//     "desktop": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "dell", "label": "Dell" },
//       { "value": "hp", "label": "HP" },
//       { "value": "lenovo", "label": "Lenovo" },
//       { "value": "apple", "label": "Apple" },
//       { "value": "asus", "label": "Asus" },
//       { "value": "acer", "label": "Acer" },
//       { "value": "msi", "label": "MSI" },
//       { "value": "cyberpowerpc", "label": "CyberPowerPC" },
//       { "value": "ibuypower", "label": "iBUYPOWER" },
//       { "value": "origin", "label": "Origin" }
//     ],
//     "keyboard": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "logitech", "label": "Logitech" },
//       { "value": "razer", "label": "Razer" },
//       { "value": "corsair", "label": "Corsair" },
//       { "value": "steelseries", "label": "SteelSeries" },
//       { "value": "hyperx", "label": "HyperX" },
//       { "value": "microsoft", "label": "Microsoft" },
//       { "value": "dell", "label": "Dell" },
//       { "value": "hp", "label": "HP" },
//       { "value": "asus", "label": "ASUS" },
//       { "value": "apple", "label": "Apple" },
//       { "value": "logitech-g", "label": "Logitech G" },
//       { "value": "redragon", "label": "Redragon" },
//       { "value": "cooler-master", "label": "Cooler Master" },
//       { "value": "others", "label": "Others" }
//     ],
//     "mouse": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "logitech", "label": "Logitech" },
//       { "value": "razer", "label": "Razer" },
//       { "value": "corsair", "label": "Corsair" },
//       { "value": "steelseries", "label": "SteelSeries" },
//       { "value": "hyperx", "label": "HyperX" },
//       { "value": "microsoft", "label": "Microsoft" },
//       { "value": "dell", "label": "Dell" },
//       { "value": "hp", "label": "HP" },
//       { "value": "asus", "label": "ASUS" },
//       { "value": "apple", "label": "Apple" },
//       { "value": "logitech-g", "label": "Logitech G" },
//       { "value": "cooler-master", "label": "Cooler Master" },
//       { "value": "others", "label": "Others" }
//     ],
//     "cpu": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "intel", "label": "Intel" },
//       { "value": "amd", "label": "AMD" },
//       { "value": "arm", "label": "ARM" },
//       { "value": "qualcomm", "label": "Qualcomm" },
//       { "value": "others", "label": "Others" }
//     ],
//     "camera": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "canon", "label": "Canon" },
//       { "value": "nikon", "label": "Nikon" },
//       { "value": "sony", "label": "Sony" },
//       { "value": "gopro", "label": "GoPro" },
//       { "value": "panasonic", "label": "Panasonic" },
//       { "value": "others", "label": "Others" }
//     ],
//     "router": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "tp-link", "label": "TP-Link" },
//       { "value": "netgear", "label": "Netgear" },
//       { "value": "asus", "label": "ASUS" },
//       { "value": "linksys", "label": "Linksys" },
//       { "value": "d-link", "label": "D-Link" },
//       { "value": "others", "label": "Others" }
//     ],
//     "desk-chair": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "herman-miller", "label": "Herman Miller" },
//       { "value": "steelcase", "label": "Steelcase" },
//       { "value": "humanscale", "label": "Humanscale" },
//       { "value": "aeron", "label": "Aeron" },
//       { "value": "ikea", "label": "IKEA" },
//       { "value": "others", "label": "Others" }
//     ],
//     "stool": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "ikea", "label": "IKEA" },
//       { "value": "costway", "label": "Costway" },
//       { "value": "amazon-basics", "label": "Amazon Basics" },
//       { "value": "flash-furniture", "label": "Flash Furniture" },
//       { "value": "others", "label": "Others" }
//     ],
//     "plastic-chair": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "nilkamal", "label": "Nilkamal" },
//       { "value": "supreme", "label": "Supreme" },
//       { "value": "cello", "label": "Cello" },
//       { "value": "wiprok", "label": "Wiprok" },
//       { "value": "others", "label": "Others" }
//     ],
//     "printer": [
//       { "value": "default", "label": "Select Brand" },
//       { "value": "hp", "label": "HP" },
//       { "value": "canon", "label": "Canon" },
//       { "value": "epson", "label": "Epson" },
//       { "value": "brother", "label": "Brother" },
//       { "value": "ricoh", "label": "Ricoh" },
//       { "value": "others", "label": "Others" }
//     ]
//   };

//   useEffect(() => {
//     const fetchEmployeesWithTickets = async () => {
//       // console.log("sakthi");
      
//       try {
//         console.log("sakthi");
//         const response = await axios.get("/purchases/get");
//         // console.log(response.data.data);
//         setPurchases(response.data.data)

//         const response1 = await axios.get('/purchases/all-devices');
//         console.log('Devices:', response1?.data.response);
//         setAllDevice(response1.data.response);
        
        
//       } catch (error) {
//         console.error( error);
//       }
//     };
//     fetchEmployeesWithTickets();

//     // const fetchAllDevices = async () => {
//     //   try {
       
//     //     return response.data;
//     //   } catch (error) {
//     //     console.error('Error fetching devices:', error);
//     //     throw error; // Re-throwing the error to handle it in the calling function
//     //   }
//     // };
//     // fetchAllDevices();

//   }, []);


//   const handlenewPurchase=()=>{
//     setNewPurchaseView("block")
//     setPurchaseHistroyView("hidden")
//     setOneProductView("hidden");
//     setBillView("hidden")
//     setPurchaseDetailsView("hidden")
//   }
//   const handlePurchaseHistroy=()=>{
//     setPurchaseHistroyView("block")
//     setNewPurchaseView("hidden")
//     setOneProductView("hidden");
//     setBillView("hidden")
//     setPurchaseDetailsView("hidden")
//   }
//    const purchasesDetailsShow =(data)=>{
//     setPurchaseDetailsView("block")
//     setPurchaseHistroyView("hidden")
//     setOneProductView("hidden");   
//     setBillView("hidden");
//     setNewPurchaseView("hidden")
//     setoneDayPurchase(data)
//     // console.log("data",data);
//     // console.log("OneDayPurchase",oneDayPurchase);
//    }

//    const historyBillBtn=(data)=>{
//     setPurchaseHistroyView("hidden")
//     setBillView("block")
//     setPurchaseDetailsView("hidden")
//     setOneProductView("hidden");
//     setoneDayPurchase("hidden")
//     // console.log(data.bill);
//     setOneDayBill(data.bill)
//    }
//    const [prevBillURL, setPrevBillURL] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setBill(file)
    
//     if (file) {
//       // Revoke the previous Blob URL to free up memory
//       // if (prevBillURL) {
//       //   URL.revokeObjectURL(prevBillURL);
//       // }
//       // Create a new Blob URL and set it
//       const fileURL = URL.createObjectURL(file);
//       setBillURL(fileURL);
    
//     }
//   };

//    const addProductCount = () => {
//     setProductDetails([...productDetails, {}]);
//     // console.log(productDetails);
//   };

//   const handleNewPurchaseSubmit = async (event) => {
//     event.preventDefault();

//     let date = new Date();
//     let purchase_ID = `QSIS-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
//     let billTitle = "Bill SAKTHI CREATE";

//     const purchaseData = {
//         productDetails,
//         productSupplier,
//         purchaseDate,
//         purchase_ID,
//         billTitle,
//     };

//     // Create a FormData object to hold the data and file
//     const formData = new FormData();
//     formData.append('data', JSON.stringify(purchaseData)); // Append the JSON data as a string
//     if (bill) {
//         formData.append('bill', bill); // Append the bill file with the name 'bill'
//     }

//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//   }
//     console.log("Sending form data:", purchaseData, bill);

//     try {
//         const response = await axios.post('http://localhost:3001/purchases/bulk', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//         });
//         setNewPurchaseView("hidden")
//         console.log('Response:', response.data);
//     } catch (error) {
//         console.error('Error submitting purchase data:', error.response ? error.response.data : error.message);
//     }
//   };

//   const handledevice = (device)=>{

//     setOneProductView("block");
//     setNewPurchaseView("hidden");
//     setBillView("hidden")
//     setPurchaseDetailsView("hidden")
//     setPurchaseHistroyView("hidden")  
//     setSelectedProducts(device)

//     console.log("select one device",device)
//     console.log("select one device", device);

//     const filteredProducts = device.productList.filter((e, i) => {
//       console.log(`e-${i}`, e);
//       return e.employeeId  === "N/A";
//     }); 
//     // console.log("",filteredProducts)
//     setAvailableStack(filteredProducts);
//     // console.log(availableStack.length);
//   }

//   const handleOneDeviceDetails =(item)=>{
//     console.log("item",item);
//     console.log("selectedProducts",selectedProducts);
//     setOneProductView("hidden");
//     setOneProductDetailsView("block")
//     setSelectedProduct(item) 
//   }

//   const EditProductDetail=() =>{
//     console.log("Click Edit");
//     console.log(selectedProduct);
//     console.log(selectedProducts);
    
    
    
//   }


  

//     return (
//     <div className='h-full'>

//       <p className=" bg-[--title-bg] py-2 px-5 mb-0 max-sm:pl-1 text-2xl text-[--common-color] font-semibold max-sm:text-base sticky top-[0vh]">
//         <span className="border-l-4 border-[--common-color] px-4 p-0 flex w-fit h-fit delay-300 duration-200 overflow-hidden">
//           <p className="animate-slide p-2"> Inventory</p>
//         </span>
//       </p>
//       {/* Main */}
//       <div className='bg-red-400 h-full w-full flex gap-2'>
//         {/* Left container */}
//         <div className='bg-slate-300 py-8  w-3/12 h-full flex flex-col p-2 gap-2 justify-between items-center '>
//           <div className='h-1/3 w-full bg-green-200 p-2 flex flex-col gap-2'> 
//             {alldevice&&alldevice.map((device)=>
//               <button onClick={()=>handledevice(device)} className='bg-blue-600 text-white font-bold text-lg py-1'>
//                 {device.productName}
//               </button>)
//             }
//           </div>
//           <div className='flex flex-col gap-2'>
//             <button onClick={handlenewPurchase} className="w-32 bg-[--sidebar-bg] font-semibold shadow-md px-2 py-1 text-md rounded-md text-white">
//               New Purchase
//             </button>
//             <button onClick={handlePurchaseHistroy} className="w-32 bg-[--sidebar-bg] font-semibold shadow-md px-2 py-1 text-md rounded-md text-white">
//               Histroy
//             </button>
//           </div>
//         </div>

//         {/* Right container */}
//         <div className='bg-gray-500 w-9/12 h-full'>
//           {/* New Purchase div */}
//           <div className={`bg-red-200 m-2 h-full w-full ${newPurchaseview}`}>
//             <p>New Purchase</p>   
//             <button
//                 onClick={()=>setNewPurchaseView("hidden")}
//                 className="w-32 bg-[--blue] text-white font-semibold shadow-md rounded-md flex items-center gap-2 px-2 mb-3 transition-all duration-200"
//               >
//               <FaArrowLeftLong />
//                 Go Back
//             </button>

//           <form onSubmit={handleNewPurchaseSubmit}>
//             {/* New Products Details */}
//             {productDetails.map((data, index) => (
//               <div className="bg-gray-300 p-4 grid grid-cols-4 gap-2 mt-2" key={index}>
//                 <label>Product Name</label>
//                 <div>
//                   <select
//                     className="block w-full max-h-12 overflow-y-auto border border-gray-300 rounded-md"
//                     onChange={(e) => {
//                       const updatedProductDetails = [...productDetails];
//                       updatedProductDetails[index].productName = e.target.value;
//                       setProductDetails(updatedProductDetails);
//                     }}
//                   >
//                     {productOptions.products.map((product, idx) => (
//                       <option key={idx} value={product.value}>
//                         {product.label}
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     onChange={(e) => {
//                       const updatedProductDetails = [...productDetails];
//                       updatedProductDetails[index].productName = e.target.value;
//                       setProductDetails(updatedProductDetails);
//                     }}
//                     className={`mt-2 rounded w-full ${productDetails[index].productName === 'others' ? 'block' : 'hidden'}`}
//                   />
//                 </div>
//                 <label>Product Count</label>
//                 <div className="flex gap-1">
//                   <input
//                     className="w-4/12 rounded-sm px-2"
//                     type="number"
//                     onChange={(e) => {
//                       const updatedProductDetails = [...productDetails];
//                       updatedProductDetails[index].productCount = e.target.value;
//                       setProductDetails(updatedProductDetails);
//                     }}
//                     value={productDetails[index].productCount}
//                     required
//                   />
//                 </div>
//                 <label>Brand</label>
//                 <div>
//                   <select
//                     className="block w-full max-h-12 overflow-y-auto border border-gray-300 rounded-md"
//                     onChange={(e) => {
//                       const updatedProductDetails = [...productDetails];
//                       updatedProductDetails[index].brandName = e.target.value;
//                       setProductDetails(updatedProductDetails);
//                     }}
//                   >
//                     {brandOptions[productDetails[index].productName]?.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     onChange={(e) => {
//                       const updatedProductDetails = [...productDetails];
//                       updatedProductDetails[index].brandName = e.target.value;
//                       setProductDetails(updatedProductDetails);
//                     }}
//                     className={`mt-2 rounded w-full ${productDetails[index].productName === 'others' ? 'block' : 'hidden'}`}
//                   />
//                 </div>
//                 <label>Warranty Date</label>
//                 <input
//                   type="date"
//                   onChange={(e) => {
//                     const updatedProductDetails = [...productDetails];
//                     updatedProductDetails[index].warrantyDate = e.target.value;
//                     setProductDetails(updatedProductDetails);
//                   }}
//                   placeholder="Warranty Date"
//                   required
//                 />
//               </div>
//             ))}
            
//             {/* Add Product Button */}
//             <div className="w-full flex justify-end mt-2 px-4">
//               <button type="button" onClick={addProductCount} className="bg-blue-600 text-white px-2 py-1 rounded-md">
//                 Add Product
//               </button>
//             </div>
            
//             {/* Supplier, Date, and Bill Upload */}
//             <div className="bg-gray-300 p-4 mt-2 flex w-full gap-4 h-fit">
//               <div className="w-1/2 flex flex-col gap-2 p-2">
//                 <label>Supplier Name:</label>
//                 <input
//                   type="text"
//                   className="px-2"
//                   placeholder="Purchase From"
//                   required
//                   onChange={(e) => setProductSupplier(e.target.value)}
//                 />
//                 <label>Purchase Date:</label>
//                 <input
//                   type="date"
//                   className="px-2"
//                   placeholder="Purchase Date"
//                   onChange={(e) => setPurchaseDate(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="w-1/2 p-4">
//                 <div className="bg-white h-full w-full flex flex-col justify-center items-center">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                   {bill && (
//                     <img
//                       src={billURL}
//                       alt="Preview"
//                       className="object-cover w-full h-full rounded-full"
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             {/* Submit Button */}
//             <div className="w-full items-center justify-center flex mt-5">
//               <button type="submit" className="w-32 bg-[--sidebar-bg] font-semibold shadow-md px-2 py-1 text-md rounded-md text-white">
//                 Submit
//               </button>
//             </div>
//           </form>
//           </div>
//           {/* Purchase Histroy  */}
//           <div className={`bg-red-200 m-2 h-full w-full ${purchaseHistroyView}`}>
//             <p>Purchase Histroy </p>
            
//             <button
//               onClick={()=>setPurchaseHistroyView("hidden")}
//               className="w-32 bg-[--blue] text-white font-semibold shadow-md rounded-md flex items-center gap-2 px-2 mb-3 transition-all duration-200"
//             >
//               <FaArrowLeftLong />
//               Go Back
//             </button>

//             <table className="w-full mt-6">
//               <thead className="">
//                 <tr className="text-center">
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                         S.No{" "}
//                       </p>
//                     </div>
//                   </th>
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                         PurchaseDate{" "}
//                       </p>
//                     </div>
//                   </th>
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                         Supplier{" "}
//                       </p>
//                     </div>
//                   </th>
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                         Bill{" "}
//                       </p>
//                     </div>
//                   </th>       
//                   <th> 
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                         Details{" "}
//                         </p>
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {purchases.map((data,index)=>  
//                   <tr
//                     key={index}
//                     className="text-center hover:bg-white duration-200 group "
//                   >
//                     <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                       {index+1}
//                     </td>
//                     <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                       {data.purchaseDate}
//                     </td>
//                     <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                       {data.productSupplier}                         
//                     </td>
//                     <td className="flex justify-center py-3 group-hover:scale-105 duration-200 font-semibold">
//                       <FaMoneyBillTrendUp 
//                         onClick={()=>historyBillBtn(data)}
//                         className="h-7 w-7" 
//                       />
//                     </td>           
//                     <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                       <button
//                         className="w-16 bg-[--blue] text-white rounded-md px-1 text-base hover:scale-110 duration-200"
//                         onClick={() => purchasesDetailsShow(data)}
//                       >
//                         Show
//                       </button>
//                     </td>
//                   </tr>
//                   )}
//               </tbody>
//             </table>
//           </div>
          
//           {/* purchase Product Details   */}
//           <div className={`bg-red-200 m-2 h-full w-full ${purchaseDetailsView}`}>
//             <p>purchase Product Details </p>
//             <button
//               onClick={()=>{
//                 setPurchaseDetailsView("hidden")
//                 setPurchaseHistroyView("block")
//               }}
//               className="w-32 bg-[--blue] text-white font-semibold shadow-md rounded-md flex items-center gap-2 px-2 mb-3 transition-all duration-200"
//             >
//               <FaArrowLeftLong />
//               Go Back 
//             </button>

//             <div className="text-center hover:text-lg hover:bg-white duration-200 group flex justify-around w-full p-2 border-2">
//               <div className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                 {oneDayPurchase && oneDayPurchase.purchaseDate ? oneDayPurchase.purchaseDate : 'N/A'}
//               </div>
//               <div className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                 {oneDayPurchase && oneDayPurchase.productSupplier ? oneDayPurchase.productSupplier : 'N/A'}
//               </div>
//               <div className="flex justify-center py-3 group-hover:scale-105 duration-200 font-semibold">
//                 <FaMoneyBillTrendUp 
//                   onClick={()=>{
//                   historyBillBtn(oneDayPurchase)
//                   }}
//                   className="h-full hover:text-blue-700 hover:w-full hover:h-full" 
//                 />
//               </div>
//             </div>

//             <table className="w-full mt-6 mb-12">
//               <thead className="">
//                 <tr className="text-center">
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                         S.No{" "}
//                       </p>
//                     </div>
//                   </th>
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                         Product Name{" "}
//                       </p>
//                     </div>
//                   </th>
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                           Product Count{" "}
//                       </p>
//                     </div>
//                   </th>
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                           Brant{" "}
//                       </p>
//                     </div>
//                   </th>
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                           Warranty Date{" "}
//                       </p>
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {oneDayPurchase && 
//                   oneDayPurchase.productDetails.map((product, index) => (
//                     <tr key={index} className="text-center hover:bg-white duration-200 group">
//                       <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                         {index + 1}
//                       </td>
//                       <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                         {product.productName}
//                       </td>
//                       <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                         {product.productCount}
//                       </td>
//                       <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                         {product.brandName}
//                       </td>
//                       <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                         {product.warrantyDate}
//                       </td>
//                     </tr>
//                   ))
//                 }
//               </tbody>
//             </table>
//           </div>
//           {/* bill */}
//           <div className={`bg-red-200 m-2 h-full w-full ${billView}`}>
//             <p>Bills</p>

//             <button
//               onClick={()=>{
//                 setPurchaseHistroyView("block")
//                 setBillView("hidden")
//               }}
//               className="w-32 bg-[--blue] text-white font-semibold shadow-md rounded-md flex items-center gap-2 px-2 mb-3 transition-all duration-200"
//             >
//               <FaArrowLeftLong />
//               Go Back
//             </button>
//               <img src={`http://localhost:3001/bill/${oneDayBill}`} alt="No Bill " className='w-1/2' />
//               {/* <a href={`http://localhost:3001/bill/${oneDayBill}`}>go bill</a> */}
//           </div>
//           {/* One Product List */}
//           <div className={`bg-red-200 m-2 h-full w-full ${OneproductView}`}>

//             <p>one Products </p>
//             <button
//               onClick={()=>{
//                 setOneProductView("hidden")
//               }}
//               className="w-32 bg-[--blue] text-white font-semibold shadow-md rounded-md flex items-center gap-2 px-2 mb-3 transition-all duration-200"
//             >
//               <FaArrowLeftLong />
//               Go Back 
//             </button>


//             <div className="text-center hover:text-lg hover:bg-white duration-200 group flex justify-around w-full p-2 border-2">
//               <div className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                 Product Name : {selectedProducts && selectedProducts.productName}
//               </div>
//               <div className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                 Total Count : {selectedProducts && selectedProducts.productList.length}
//               </div>
//               <div className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                 available Stack : {availableStack && availableStack.length}
//               </div>
//               <div className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                 Disturbuted : {selectedProducts&&     selectedProducts.productList.length-availableStack.length}
//               </div>

//             </div>

//             <table className="w-full mt-6 mb-12">
//               <thead className="">
//                 <tr className="text-center">
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                         S.No{" "}
//                      </p>
//                     </div>
//                   </th>
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                         Product ID{" "}
//                       </p>
//                     </div>
//                   </th>
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                           Location{" "}
//                       </p>
//                     </div>
//                   </th>
//                   <th>
//                     <div className="w-full flex items-center justify-center">
//                       <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
//                         {" "}
//                         Details{" "}
//                       </p>
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedProducts&&selectedProducts.productList.map((item,index)=>
//                   <tr key={index}>
//                     <td className="py-3 group-hover:scale-105 duration-200 font-semibold">{index+1}</td>
//                     <td className="py-3 group-hover:scale-105 duration-200 font-semibold">{item.productid ? item.productid : "-"}</td>
//                     <td className="py-3 group-hover:scale-105 duration-200 font-semibold">{item.employeeId=== "N/A"?"Company":"Employee"}</td>
//                     <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
//                       <button
//                         className="w-16 bg-[--blue] text-white rounded-md px-1 text-base hover:scale-110 duration-200"
//                         onClick={()=>handleOneDeviceDetails(item)}
//                       >
//                         Show
//                       </button>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>  

//           </div>
//           {/* One product Details */}
//           <div className={`bg-red-200 m-2 h-full w-full ${OneproductDetailsView}`}>

//             <p>one Product Details</p>
//             <button
//               onClick={()=>{
//                 setOneProductDetailsView("hidden")
//                 setOneProductView("block")
//               }}
//               className="w-32 bg-[--blue] text-white font-semibold shadow-md rounded-md flex items-center gap-2 px-2 mb-3 transition-all duration-200"
//             >
//               <FaArrowLeftLong />
//               Go Back 
//             </button>

//             <div className={`w-fit ml-4 ${productEditView==="hidden"?"block":"hidden"}`}>
//               <p className='w-full flex justify-between'>
//                 Product Name: <span>{selectedProducts && selectedProducts.productName}</span>
//               </p>
              
//               {selectedProduct && (
//                 <>
//                   <p className='w-full flex justify-between'>
//                     Brand Name: <span>{selectedProduct.brandName}</span>
//                   </p>
//                   <p className='w-full flex justify-between'>
//                     Purchase Date: <span>{selectedProduct.purchaseDate}</span>
//                   </p>
//                   <p className='w-full flex justify-between'>
//                     Warranty Date: <span>{selectedProduct.warrantyDate}</span>
//                   </p>
//                   <p className='w-full flex justify-between'>
//                     PRoduct ID: <span>{selectedProduct.productid}</span>
//                   </p>
//                   <p className='w-full flex justify-between'>
//                     Condition: <span>{selectedProduct.condition}</span>
//                   </p>
//                   <p className='w-full flex justify-between'>
//                     Current Location: <span>{selectedProduct.currentLocation}</span>
//                   </p>
//                   <p className='w-full flex justify-between'>
//                     Employee ID: <span>{selectedProduct.employeeId}</span>
//                   </p>
//                   <p className='w-full flex justify-between'>
//                     Issue Date: <span>{selectedProduct.issueDate}</span>
//                   </p>
//                   <p className='w-full flex justify-between'>
//                     Issued To: <span>{selectedProduct.issuedTo}</span>
//                   </p>
//                   <button onClick={()=>setProductEditView("block")} className="w-32 bg-[--blue] text-white font-semibold rounded-md px-2 mb-3">
//                     Edit
//                   </button>
//                 </>
//               )}
//             </div>

//             <div className={`w-fit ml-4 ${productEditView}`}>
//               {selectedProduct ? (
//                 <>
//                   <label className='w-full flex justify-between'>
//                     Product Name:
//                     <input type="text" className='text-gray-400' value={selectedProducts.productName} readOnly />
//                   </label>
//                   <br />
                  
//                   <label className='w-full flex justify-between'>
//                     Brand Name:
//                     <input type="text" className='text-gray-400' value={selectedProduct.brandName} readOnly />
//                   </label>
//                   <br />
                  
//                   <label className='w-full flex justify-between'>
//                     Purchase Date:
//                     <input type="text" className='text-gray-400' value={selectedProduct.purchaseDate} readOnly />
//                   </label>
//                   <br />
                  
//                   <label className='w-full flex justify-between'>
//                     Warranty Date:
//                     <input type="text" className='text-gray-400' value={selectedProduct.warrantyDate} readOnly />
//                   </label>
//                   <br />

//                   <label className='w-full flex justify-between'>
//                     Product ID:
//                     <input 
//                       type="text" 
//                       value={selectedProduct.productid} 
//                       onChange={(e) => setSelectedProduct({
//                         ...selectedProduct,
//                         productid: e.target.value
//                       })}
//                     />
//                   </label>
//                   <br />
                      
//                   <label className='w-full flex justify-between'>
//                     Condition:
//                     <input 
//                       type="text" 
//                       value={selectedProduct.condition} 
//                       onChange={(e) => setSelectedProduct({
//                         ...selectedProduct,
//                         condition: e.target.value
//                       })}
//                     />
//                   </label>
//                   <br />
                  
//                   <label className='w-full flex justify-between'>
//                     Current Location:
//                     <input 
//                       type="text" 
//                       value={selectedProduct.currentLocation} 
//                       onChange={(e) => setSelectedProduct({
//                         ...selectedProduct,
//                         currentLocation: e.target.value
//                       })}
//                     />
//                   </label>
//                   <br />
                  
//                   <label className='w-full flex justify-between'>
//                     Employee ID:
//                     <input 
//                       type="text" 
//                       value={selectedProduct.employeeId} 
//                       onChange={(e) => setSelectedProduct({
//                         ...selectedProduct,
//                         employeeId: e.target.value
//                       })}
//                     />
//                   </label>
//                   <br />
                  
//                   <label className='w-full flex justify-between'>
//                     Issue Date:
//                     <input 
//                       type="text" 
//                       value={selectedProduct.issueDate} 
//                       onChange={(e) => setSelectedProduct({
//                         ...selectedProduct,
//                         issueDate: e.target.value
//                       })}
//                     />
//                   </label>
//                   <br />
                  
//                   <label className='w-full flex justify-between'>
//                     Issued To:
//                     <input 
//                       type="text" 
//                       value={selectedProduct.issuedTo} 
//                       onChange={(e) => setSelectedProduct({
//                         ...selectedProduct,
//                         issuedTo: e.target.value
//                       })}
//                     />
//                   </label>

//                   <button onClick={()=>setProductEditView("hidden")} className="w-32 mt-4 bg-[--blue] text-white font-semibold rounded-md px-2 mb-3">
//                     back
//                   </button>
//                   <button onClick={()=>{EditProductDetail()}} className="w-32 bg-[--blue] text-white font-semibold rounded-md px-2 mb-3  ml-4">
//                     submit
//                   </button>

//                 </>
//               ) : (
//                 <p>No product selected</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//   </div>
//   )
// }

// export default Inventory
import React, { useState, useEffect } from "react";
import axios from "./utilities/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { FaAngleRight, FaArrowLeftLong } from "react-icons/fa6";

export default function Inventory() {
  const [data, setData] = useState([]);
  const [productName, setProductName] = useState("");
  const [inventory, setInventory] = useState({ items: [] });
  const [addProduct, setAddProduct] = useState(0);
  const [editProduct, setEditProduct] = useState(0);
  const [brand, setBrand] = useState("");
  const [brandFeatures, setBrandFeatures] = useState([]);
  const [individualFeature, setIndividualFeature] = useState([]);
  const [flag, setFlag] = useState(0);
  const [productId, setProductId] = useState("");

  const [inputProductName, setInputProductName] = useState("");
  const [inputBrand, setInputBrand] = useState("");
  const [inputWarrantyDate, setInputWarrantyDate] = useState("");
  const [inputGivenToEmployee, setInputGivenToEmployee] = useState("");
  const [inputCondition, setInputCondition] = useState("");
  const [inputPlace, setInputPlace] = useState("");
  const [inputPurchaseDate, setInputPurchaseDate] = useState("");
  const [inputProductFrom, setInputProductFrom] = useState("");
  const [inputBill, setInputBill] = useState(""); // Image name as string
  const [inputProductID, setInputProductID] = useState("");

  const productDetails = inventory.items.find(
    (item) => item.productname === productName
  );

  //---------------------------adding Data----------------------------------
  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    const inventoryData = {
      ProductName: inputProductName,
      Features: [
        {
          Brand: inputBrand,
          Warranty_Date: inputWarrantyDate,
          Given_To_Employee: inputGivenToEmployee,
          Condition: inputCondition,
          Place: inputPlace,
          Purchase_Date: inputPurchaseDate,
          Product_From: inputProductFrom,
          Bill: inputBill, // Image as string
          Product_ID: inputProductID,
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/inventory/addInventoryItem",
        inventoryData
      );
      console.log("Inventory item added:", response.data);
      toast.success("Product Details Added Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error adding inventory item:", error);
      toast.error("Error Adding product details");
    }
  };

  //---------------------------adding Data----------------------------------------

  //----------------------------editing form data---------------------------------

  const [targetProductId, setTargetProductId] = useState("");
  const [targetFeatureId, setTargetFeatureId] = useState("");

  const result = data
    .map((product) => ({
      ProductName: product.ProductName,
      Features: product.Features.filter(
        (feature) => feature._id === targetFeatureId
      ),
    }))
    .filter((product) => product.Features.length > 0)[0];

  console.log("exp o/p", result);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedFeature = {
      Brand: formDataEdit.Brand || result.Features[0].Brand,
      Warranty_Date:
        formDataEdit.Warranty_Date || result.Features[0].Warranty_Date,
      Given_To_Employee:
        formDataEdit.Given_To_Employee || result.Features[0].Given_To_Employee,
      Condition: formDataEdit.Condition || result.Features[0].Condition,
      Place: formDataEdit.Place || result.Features[0].Place,
      Purchase_Date:
        formDataEdit.Purchase_Date || result.Features[0].Purchase_Date,
      Product_From:
        formDataEdit.Product_From || result.Features[0].Product_From,
      Bill: formDataEdit.Bill || result.Features[0].Bill,
      Product_ID: formDataEdit.Product_ID || result.Features[0].Product_ID,
      _id: formDataEdit._id || result.Features[0]._id,
    };

    const payload = {
      ProductName: result.ProductName, // Use the ProductName from the result
      Features: [updatedFeature],
    };

    fetch("http://localhost:3001/inventory/addInventoryItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Product Edited Successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to Update Product details");
      });
  };

  //----------------------------editing form data---------------------------------

  //----------------------------------delete data--------------------------------
  const handleDelete = (productName, productId) => {
    fetch(
      `http://localhost:3001/inventory/deletInventory/${productName}/${productId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Success:", data);
        toast.success("Product Deleted Successfully");
        window.location.reload();
        // Optionally, refresh the list or state to reflect the deletion
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to Delete Product");
      });
  };
  //----------------------------------delete data--------------------------------

  //-----------------------------Fetching Backedn data-------------------------------------------------

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/inventory/getAllInventory"
        );
        console.log("Inventory Data", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Inventory Data", error);
      }
    };
    fetchInventoryData();
  }, []);

  console.log("json response", data);
  console.log("selected brand name", brand);

  const [formDataEdit, setFormDataEdit] = useState(individualFeature);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataEdit((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //--------------------------[  Finding the product total count, available count and distributed count based on brand wise  ]-----------------------------------------------------------------------------
  const laptopFeatures =
    productName !== ""
      ? data.find((item) => item.ProductName === productName)?.Features
      : null;

  const brandMetrics =
    laptopFeatures?.reduce((acc, feature) => {
      const brand = feature.Brand;
      acc[brand] = acc[brand] || {
        count: 0,
        availableStack: 0,
        distributedStack: 0,
      };
      acc[brand].count += 1;
      acc[brand].availableStack += !feature.Employee_ID ? 1 : 0;
      acc[brand].distributedStack += feature.Employee_ID ? 1 : 0;
      return acc;
    }, {}) || {};

  const uniqueBrands = Object.keys(brandMetrics);

  //------------------------------------------------------------------------------------------------------------
  const featureSelected = (brand) => {
    const brandFeatures = [];
    data.forEach((item) => {
      item.Features.forEach((feature) => {
        if (feature.Brand === brand) {
          brandFeatures.push(feature);
        }
      });
    });
    console.log("Brand Features", brandFeatures);
  };

  //-------------------------------
  function selectedFeatures(brand) {
    const Features = [];

    data.forEach((data) => {
      data.Features.forEach((feature) => {
        if (feature.Brand === brand) {
          Features.push(feature);
        }
      });
    });
    setBrand(brand);
    setBrandFeatures(Features);

    console.log("brand features", brandFeatures);
  }
  //-------------------------------

  console.log("individual feature", individualFeature);

  return (
    <div className="w-full h-[90vh]  overflow-scroll">
      <p className=" bg-[--title-bg] py-2 px-5 mb-0 max-sm:pl-1 text-3xl text-[--title-text] font-light max-sm:text-base sticky top-[0vh]">
        <span className="border-l-4 border-[--sidebar-color] px-4 p-0 flex w-fit h-fit delay-300 duration-200 overflow-hidden">
          <p className="animate-slide p-2">Inventory</p>
        </span>
      </p>
      <div className="flex flex-row border-t border-[--sidebar-bg] items-center justify-center h-full overflow-scroll">
        {/* Left container */}
        <div className="w-1/4 flex flex-col gap-3 items-center justify-between py-4 h-full border-r border-[--sidebar-bg]">
          <h2 className="w-full text-center text-4xl">Product List</h2>
          {/* View Products */}
          <div className="h-full flex flex-col  p-0 items-center rounded-md w-full">
            <div className="flex items-start flex-col justify-between h-full w-full">
              <div className="w-full flex flex-col items-center justify-start gap-5 pr-4">
                {data.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setProductName(item.ProductName);
                      setTargetProductId(item._id);
                      setBrand("");
                      setFlag(0);
                      setAddProduct(0);
                      setEditProduct(0);
                    }}
                    className=" flex flex-row justify-between items-center lg:font-semibold px-4 bg-white shadow-md w-full group py-4 rounded-r-md text-gray-600 text-center hover:bg-[--sidebar-bg] hover:text-white cursor-pointer transition-all duration-200"
                  >
                    <span>{item.ProductName.toUpperCase()}</span>
                    <span className="w-10 overflow-hidden">
                      <FaAngleRight className="duration-200 group-hover:flex text-center items-center justify-center h-full group-hover:translate-x-0 -translate-x-10" />
                    </span>
                  </p>
                ))}
              </div>

              <div className="w-full flex flex-col justify-center items-center">
                <button
                  className="w-32 bg-[--sidebar-bg] font-semibold shadow-md px-2 py-1 text-md rounded-md text-white"
                  onClick={() => {
                    setFlag(0);
                    setAddProduct(1);
                    setEditProduct(0);
                  }}
                >
                  ADD Product 
                </button>

                <div className="w-full mt-2 flex flex-col items-center justify-between">
                  <button className="w-full font-semibold">History Show</button>
                  <select
                    className="w-fit text-center m-auto px-2 bg-white shadow-md font-semibold rounded-md"
                    onChange={(e) => {
                      const selectedItem = data.find(
                        (item) => item.ProductName === e.target.value
                      );
                      setProductName(selectedItem.ProductName);
                      setTargetProductId(selectedItem._id);
                      setBrand("");
                      setFlag(0);
                      setAddProduct(0);
                      setEditProduct(0);
                    }}
                  >
                    <option value="" disabled selected>
                      Select a product
                    </option>
                    {data.map((item, index) => (
                      <option
                        className="border-b border-b-black"
                        key={index}
                        value={item.ProductName}
                      >
                        {item.ProductName.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Right Container*/}
        <div className={`w-3/4 p-4 flex flex-col gap-2 h-screen`}>
          {/* To View Product Details */}

          <div
            className={`w-full ${
              addProduct !== 0 || editProduct !== 0 || brand !== ""
                ? "hidden"
                : "block"
            } m-auto h-full max-h-auto`}
          >
            {productName ? (
              <div className="w-full h-full flex flex-col gap-3 items-center">
                <h2 className="w-full text-center text-4xl">Product Details</h2>
                {/* Header with Title, Count and Add new product */}
                <div className="h-full w-full flex flex-col gap-4">
                  <div className="flex px-4 py-4 rounded-md w-full justify-evenly items-center bg-white">
                    <div className="w-full px-2 flex justify-between items-center">
                      <p>
                        <span className="font-semibold">Product:</span>{" "}
                        {productName}
                      </p>
                      <p>
                        <span className="font-semibold">Count:</span>{" "}
                        {data.find((item) => item.ProductName === productName)
                          ?.Features.length || 0}
                      </p>
                      <p>
                        <span className="font-semibold">Available Stack:</span>{" "}
                        {data
                          .find((item) => item.ProductName === productName)
                          ?.Features.filter((feature) => !feature.Employee_ID)
                          .length || 0}
                      </p>
                      <p>
                        <span className="font-semibold">Given Stack:</span>{" "}
                        {data
                          .find((item) => item.ProductName === productName)
                          ?.Features.filter((feature) => feature.Employee_ID)
                          .length || 0}
                      </p>
                    </div>
                  </div>
                  <div>
                    <table className="w-full">
                      <thead className="">
                        <tr className="text-center">
                          <th>
                            <div className="w-full flex items-center justify-center">
                              <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                {" "}
                                S.No{" "}
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex items-center justify-center">
                              <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                {" "}
                                Brand{" "}
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex items-center justify-center">
                              <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                {" "}
                                Total Stack{" "}
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex items-center justify-center">
                              <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                {" "}
                                Available Stack{" "}
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex items-center justify-center">
                              <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                {" "}
                                Distributed Count{" "}
                              </p>
                            </div>
                          </th>
                          <th>
                            <div className="w-full flex items-center justify-center">
                              <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                {" "}
                                View Details{" "}
                              </p>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {uniqueBrands.map((brand, index) => (
                          <tr
                            key={index}
                            className="text-center hover:bg-white duration-200 group "
                          >
                            <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                              {index + 1}
                            </td>
                            <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                              {brand}
                            </td>
                            <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                              {brandMetrics[brand].count}
                            </td>
                            <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                              {brandMetrics[brand].availableStack}
                            </td>
                            <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                              {brandMetrics[brand].distributedStack}
                            </td>
                            <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                              <button
                                className="w-16 bg-[--blue] text-white rounded-md px-1 text-base hover:scale-110 duration-200"
                                onClick={() =>
                                  //  {setBrand(brand);}
                                  selectedFeatures(brand)
                                }
                              >
                                Show
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex h-full items-center justify-center">
                Select Product to View Details
              </div>
            )}
          </div>

          <div
            className={`w-full ${
              addProduct === 0 &&
              editProduct === 0 &&
              brand !== "" &&
              flag !== 1
                ? "flex-flex-col"
                : "hidden"
            }  m-auto h-full max-h-auto `}
          >
            <button
              onClick={() => {
                setBrand("");
              }}
              className="w-32 bg-[--blue] font-semibold flex mt-4 ml-4 items-center gap-2 px-2 mb-3 rounded-md text-white shadow-md transition-all duration-200"
            >
              <FaArrowLeftLong />
              Go Back
            </button>

            <div className={`h-full w-full `}>
              <div className="w-full felx items-center">
                {brandFeatures.length > 0 ? (
                  <>
                    <div className="flex px-4 py-4 mb-5 w-full justify-evenly bg-white rounded-md items-center">
                      <div className="w-full px-2 flex justify-between items-center">
                        <p>
                          <span className="font-semibold">Brand:</span>{" "}
                          {brandFeatures[0].Brand}{" "}
                        </p>
                        <p>
                          <span className="font-semibold">Count:</span>{" "}
                          {brandFeatures.length}
                        </p>
                        <p>
                          <span className="font-semibold">
                            Available Stack:
                          </span>{" "}
                          {brandFeatures.filter(
                            (feature) => !feature.Employee_ID
                          ).length || 0}
                        </p>
                        <p>
                          <span className="font-semibold">Given Stack:</span>{" "}
                          {brandFeatures.filter(
                            (feature) => feature.Employee_ID
                          ).length || 0}
                        </p>
                      </div>
                    </div>

                    <div>
                      <table className="w-full">
                        <thead className="w-full">
                          <tr className="text-center w-full">
                            <th>
                              <div className="w-full flex items-center justify-center">
                                <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                  {" "}
                                  S.No{" "}
                                </p>
                              </div>
                            </th>
                            <th>
                              <div className="w-full flex items-center justify-center">
                                <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                  {" "}
                                  Product ID{" "}
                                </p>
                              </div>
                            </th>
                            <th>
                              <div className="w-full flex items-center justify-center">
                                <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                  {" "}
                                  Condition{" "}
                                </p>
                              </div>
                            </th>
                            <th>
                              <div className="w-full flex items-center justify-center">
                                <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                  {" "}
                                  Place{" "}
                                </p>
                              </div>
                            </th>
                            <th>
                              <div className="w-full flex items-center justify-center">
                                <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                  {" "}
                                  View Details{" "}
                                </p>
                              </div>
                            </th>
                            <th>
                              <div className="w-full flex items-center justify-center">
                                <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                  {" "}
                                  Edit{" "}
                                </p>
                              </div>
                            </th>
                            <th>
                              <div className="w-full flex items-center justify-center">
                                <p className="w-fit h-full py-2 rounded-md px-4 text-white bg-[--sidebar-bg] flex items-center justify-center">
                                  {" "}
                                  Delete{" "}
                                </p>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {brandFeatures.map((data, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-100 transition-all duration-200 group"
                            >
                              <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                                {index + 1}
                              </td>
                              <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                                {data.Product_ID}
                              </td>
                              <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                                {data.Condition}
                              </td>
                              <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                                {data.Place}
                              </td>
                              <td className="py-3 group-hover:scale-105 duration-200 font-semibold">
                                <button
                                  className="w-16 transition-all duration-200 bg-[--sidebar-bg] font-semibold shadow-md text-white rounded-md px-1 text-base hover:scale-110"
                                  onClick={() => {
                                    setIndividualFeature(data);
                                    setFlag(1);
                                  }}
                                >
                                  Show
                                </button>
                              </td>

                              <td className="py-3 group-hover:scale-105 duration-200">
                                <button
                                  className="w-16 transition-all duration-200 bg-[--blue] font-semibold shadow-md text-white rounded-md px-1 text-base hover:scale-110"
                                  onClick={() => {
                                    setIndividualFeature(data);
                                    setEditProduct(1);
                                    setTargetFeatureId(data._id);
                                    setAddProduct(0);
                                  }}
                                >
                                  Edit
                                </button>
                              </td>

                              <td className="py-3 group-hover:scale-105 duration-200">
                                <button
                                  className="w-16 transition-all duration-200 bg-[--red] font-semibold text-white shadow-md rounded-md px-1 text-base hover:scale-110"
                                  onClick={() =>
                                    handleDelete(productName, data.Product_ID)
                                  }
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className={`w-full ${
              flag !== 0 ? "flex flex-col" : "hidden"
            } m-auto h-screen max-h-auto `}
          >
            <button
              onClick={() => {
                setIndividualFeature([]);
                setFlag(0);
              }}
              className="w-32 bg-[--blue] text-white font-semibold shadow-md rounded-md flex items-center gap-2 px-2 mb-3 transition-all duration-200"
            >
              <FaArrowLeftLong />
              Go Back
            </button>

            {individualFeature ? (
              <form
                action=""
                className="w-full lg:flex  lg:items-center gap-4 lg:p-3   h-full"
              >
                {/* Left side Details */}
                <div className="w-full h-full ">
                  <div className="mt-2  flex flex-col">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      {" "}
                      Brand Name
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10  w-3/4 m-auto shadow-md rounded-md"
                      readOnly
                      placeholder={individualFeature.Brand}
                    />
                  </div>

                  <div className="mt-2  flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Warranty Date
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10  w-3/4 m-auto shadow-md rounded-md"
                      readOnly
                      placeholder={individualFeature.Warranty_Date?.slice(
                        0,
                        10
                      )}
                    />
                  </div>

                  <div className="mt-2  flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Given To
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10  w-3/4 m-auto shadow-md rounded-md"
                      readOnly
                      placeholder={individualFeature.Given_To_Employee}
                    />
                  </div>

                  <div className="mt-2  flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Condition
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10  w-3/4 m-auto shadow-md rounded-md"
                      readOnly
                      placeholder={individualFeature.Condition}
                    />
                  </div>

                  <div className="mt-2  flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Place
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10  w-3/4 m-auto shadow-md rounded-md"
                      readOnly
                      placeholder={individualFeature.Place}
                    />
                  </div>
                </div>

                {/* Right Side Details */}
                <div className="w-full block  h-full">
                  <div className="mt-2  flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      {" "}
                      Product Count
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10  w-3/4 m-auto shadow-md rounded-md"
                      readOnly
                      placeholder="Nill"
                    />
                  </div>

                  <div className="mt-2  flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Purchase Date
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10  w-3/4 m-auto shadow-md rounded-md"
                      readOnly
                      placeholder={individualFeature.Purchase_Date?.slice(
                        0,
                        10
                      )}
                    />
                  </div>

                  <div className="mt-2  flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Product By From
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10  w-3/4 m-auto shadow-md rounded-md"
                      readOnly
                      placeholder={individualFeature.Product_From}
                    />
                  </div>

                  <div className="mt-2  flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Bill
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10  w-3/4 m-auto shadow-md rounded-md"
                      readOnly
                      placeholder={individualFeature.Bill}
                    />
                  </div>

                  <div className="mt-2  flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Product ID
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10  w-3/4 m-auto shadow-md rounded-md"
                      readOnly
                      placeholder={individualFeature.Product_ID}
                    />
                  </div>
                </div>
              </form>
            ) : null}
          </div>

          {/* --------------------------------Add and edit Product Details ---------------------------------------------------*/}
          <div
            className={`w-full ${
              addProduct || editProduct ? "flex flex-col" : "hidden"
            } m-auto h-full max-h-auto`}
          >
            <div className="w-full flex items-center ">
              <button
                onClick={() => {
                  setAddProduct(0);
                  setEditProduct(0);
                }}
                className="w-32 bg-[--blue] font-semibold text-white rounded-md flex items-center gap-2 px-2 mb-3 transition-all duration-200"
              >
                <FaArrowLeftLong />
                Go Back
              </button>
              <h2
                className={`${
                  addProduct
                    ? "w-2/3 text-center text-lg font-semibold"
                    : "hidden"
                }`}
              >
                Add Product Details
              </h2>
              <h2
                className={`${
                  editProduct
                    ? "w-2/3 text-center text-lg font-semibold"
                    : "hidden"
                }`}
              >
                Edit Product Details
              </h2>
            </div>
            {/*------------------------------ Add form------------------------- */}
            <form
              onSubmit={handleSubmitAdd}
              className={`${
                addProduct
                  ? " w-full lg:flex lg:items-center gap-4 lg:p-5 h-full"
                  : "hidden"
              }`}
            >
              <div className="w-full h-full ">
                <div className="mt-2  flex flex-col ">
                  <label>Product Name:</label>
                  <select
                    value={inputProductName}
                    required
                    onChange={(e) => setInputProductName(e.target.value)}
                  >
                    <option value="">Select Product</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Keyboard">Keyboard</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="mt-2  flex flex-col ">
                  <label>Brand:</label>
                  <input
                    type="text"
                    value={inputBrand}
                    required
                    onChange={(e) => setInputBrand(e.target.value)}
                  />
                </div>
                <div className="mt-2  flex flex-col ">
                  <label>Warranty Date:</label>
                  <input
                    type="date"
                    value={inputWarrantyDate}
                    required
                    onChange={(e) => setInputWarrantyDate(e.target.value)}
                  />
                </div>
                <div className="mt-2  flex flex-col ">
                  <label>Given To Employee:</label>
                  <input
                    type="text"
                    value={inputGivenToEmployee}
                    required
                    onChange={(e) => setInputGivenToEmployee(e.target.value)}
                  />
                </div>
                <div className="mt-2  flex flex-col ">
                  <label>Condition:</label>
                  <input
                    type="text"
                    value={inputCondition}
                    required
                    onChange={(e) => setInputCondition(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full h-full ">
                <div className="mt-2  flex flex-col ">
                  <label>Place:</label>
                  <input
                    type="text"
                    value={inputPlace}
                    required
                    onChange={(e) => setInputPlace(e.target.value)}
                  />
                </div>
                <div className="mt-2  flex flex-col ">
                  <label>Purchase Date:</label>
                  <input
                    type="date"
                    value={inputPurchaseDate}
                    required
                    onChange={(e) => setInputPurchaseDate(e.target.value)}
                  />
                </div>
                <div className="mt-2  flex flex-col ">
                  <label>Product From:</label>
                  <input
                    type="text"
                    value={inputProductFrom}
                    required
                    onChange={(e) => setInputProductFrom(e.target.value)}
                  />
                </div>
                <div className="mt-2  flex flex-col ">
                  <label>Bill (Image Name):</label>
                  <input
                    type="text"
                    value={inputBill}
                    required
                    onChange={(e) => setInputBill(e.target.value)}
                  />
                </div>
                <div className="mt-2  flex flex-col ">
                  <label>Product ID:</label>
                  <input
                    type="text"
                    value={inputProductID}
                    onChange={(e) => setInputProductID(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-2  flex flex-col ">
                  <button
                    type="submit"
                    className="bg-teal-600 text-white  w-40 px-2 hover:bg-teal-700 transition-all duration-200 rounded-md"
                  >
                    Add Inventory Item
                  </button>
                </div>
              </div>
            </form>

            {/* ------------------------------- Edit form data ---------------------- */}

            {result && (
              <form
                onSubmit={handleEditSubmit}
                className={`${
                  editProduct
                    ? "w-full lg:flex lg:items-center gap-4 lg:p-3 h-full"
                    : "hidden"
                }`}
              >
                {/* Left side Details */}
                <div className="w-full h-full">
                  <div className="mt-2 flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10 w-3/4 m-auto shadow-md rounded-md"
                      name="Brand"
                      value={formDataEdit.Brand}
                      onChange={handleInputChange}
                      placeholder={individualFeature.Brand}
                    />
                  </div>

                  <div className="mt-2 flex flex-col ">
                    <label className="text-xl w-3/4 flex items-center  m-auto font-semibold mb-1">
                      Warranty Date{" "}
                      <p className="ml-2 text-xl">
                        {" "}
                        {result.Features[0].Warranty_Date?.slice(0, 10)}
                      </p>{" "}
                    </label>

                    <input
                      type="date"
                      className="px-5 font-bold h-10 w-3/4 m-auto shadow-md rounded-md"
                      name="Warranty_Date"
                      value={formDataEdit.Warranty_Date?.slice(0, 10)}
                      onChange={handleInputChange}
                      placeholder={individualFeature.Warranty_Date?.slice(
                        0,
                        10
                      )}
                    />
                  </div>

                  <div className="mt-2 flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Given To
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10 w-3/4 m-auto shadow-md rounded-md"
                      name="Given_To_Employee"
                      value={formDataEdit.Given_To_Employee}
                      onChange={handleInputChange}
                      placeholder={individualFeature.Given_To_Employee}
                    />
                  </div>

                  <div className="mt-2 flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Condition
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10 w-3/4 m-auto shadow-md rounded-md"
                      name="Condition"
                      value={formDataEdit.Condition}
                      onChange={handleInputChange}
                      placeholder={individualFeature.Condition}
                    />
                  </div>

                  <div className="mt-2 flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Place
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10 w-3/4 m-auto shadow-md rounded-md"
                      name="Place"
                      value={formDataEdit.Place}
                      onChange={handleInputChange}
                      placeholder={individualFeature.Place}
                    />
                  </div>
                </div>

                {/* Right Side Details */}
                <div className="w-full block h-full">
                  {/* <div className="mt-2 flex flex-col ">
                      <label className="text-xl w-3/4 m-auto font-semibold mb-1">Product Count</label>
                      <input
                        type="text"
                        className="pl-5 font-bold h-10 w-3/4 m-auto"
                        name="Product_Count"
                        value={formDataEdit.Product_Count}
                        onChange={handleInputChange}
                        placeholder={individualFeature.p}
                      />
                    </div> */}

                  <div className="mt-2 flex flex-col ">
                    <label className="text-xl w-3/4 flex items-center m-auto font-semibold mb-1">
                      Purchase Date{" "}
                      <p className="text-xl ml-2">
                        {result.Features[0].Purchase_Date.slice(0, 10)}
                      </p>
                    </label>

                    <input
                      type="date"
                      className="px-5 font-bold h-10 w-3/4 m-auto shadow-md rounded-md"
                      name="Purchase_Date"
                      value={formDataEdit.Purchase_Date}
                      onChange={handleInputChange}
                      placeholder={individualFeature.Purchase_Date.slice(0, 10)}
                    />
                  </div>

                  <div className="mt-2 flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Product By From
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10 w-3/4 m-auto shadow-md rounded-md"
                      name="Product_From"
                      value={formDataEdit.Product_From}
                      onChange={handleInputChange}
                      placeholder={individualFeature.Product_From}
                    />
                  </div>

                  <div className="mt-2 flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Bill
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10 w-3/4 m-auto shadow-md rounded-md"
                      name="Bill"
                      value={formDataEdit.Bill}
                      onChange={handleInputChange}
                      placeholder={individualFeature.Bill}
                    />
                  </div>

                  <div className="mt-2 flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Product ID (View Only)
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10 w-3/4 m-auto shadow-md rounded-md"
                      name="Product_ID"
                      value={formDataEdit.Product_ID}
                      onChange={handleInputChange}
                      placeholder={individualFeature.Product_ID}
                      readOnly
                    />
                  </div>
                  <div className="mt-2 flex flex-col ">
                    <label className="text-xl w-3/4 m-auto font-semibold mb-1">
                      Id
                    </label>
                    <input
                      type="text"
                      className="pl-5 font-bold h-10 w-3/4 m-auto shadow-md rounded-md"
                      name="Bill"
                      value={formDataEdit._id}
                      onChange={handleInputChange}
                      placeholder={result.Features[0]._id}
                    />
                  </div>

                  <div className="mt-2 flex flex-col ">
                    <button
                      type="submit"
                      className="mt-5 bg-[--blue] text-white font-bold py-2 px-4 w-3/4 m-auto shadow-md rounded-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}