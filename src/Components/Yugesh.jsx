// import React, { useState } from 'react'

// const Inventory = () => {
//   const [btnValue,setBtnValue] = useState("")

//   const dataHandle=(e)=>{
//     setBtnValue(e.target.value);
//     console.log(e.target.value);
//   }

//   // const buttonTitle=[
//   //   {"Laptop":[{
//   //     lap1:[
//   //       {title:"acer",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //     lap2:[
//   //       {title:"asus",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //     lap3:[
//   //       {title:"dell",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //     lap4:[
//   //       {title:"lenovo",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //   }]
//   //   },
//   //   {title:"CPU",
//   //     index:2,
//   //     cpu1:[
//   //       {title:"acer",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //     cpu2:[
//   //       {title:"asus",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //     cpu3:[
//   //       {title:"dell",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //     cpu4:[
//   //       {title:"lenovo",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //   },
//   //   {title:"Moniter",
//   //     index:3,
//   //     moniter1:[
//   //       {title:"acer",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"acer",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //     moniter2:[
//   //       {title:"asus",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"asus",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //     moniter3:[
//   //       {title:"dell",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"dell",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //     moniter4:[
//   //       {title:"lenovo",pid:"000001",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000002",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000003",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000004",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000005",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000006",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000007",warrenty:"10/10/2025",ststus:true},
//   //       {title:"lenovo",pid:"000008",warrenty:"10/10/2025",ststus:true},
//   //     ],
//   //   },
//   //   {title:"Keyboard",
//   //     index:3,
//   //   },
//   //   {title:"Mouse"},
//   //   {title:"UPS"},
//   //   {title:"TV"},
//   //   {title:"Tablet"},
//   //   {title:"Others"},
//   //   {title:"Others"},
//   //   {title:"Others"},
//   //   {title:"Others"},
//   // ]
//   const buttonTitle={
//     "categories": [
//       {
//         "title": "Laptop",
//         "index": 1,
//         "brands": {
//           "Acer": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ],
//           "Asus": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ],
//           "Dell": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ],
//           "Lenovo": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ]
//         }
//       },
//       {
//         "title": "CPU",
//         "index": 2,
//         "brands": {
//           "Acer": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ],
//           "Asus": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ],
//           "Dell": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ],
//           "Lenovo": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ]
//         }
//       },
//       {
//         "title": "Monitor",
//         "index": 3,
//         "brands": {
//           "Acer": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ],
//           "Asus": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ],
//           "Dell": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ],
//           "Lenovo": [
//             {"pid": "000001", "warranty": "10/10/2025", "status": true},
//             {"pid": "000002", "warranty": "10/10/2025", "status": true},
//             {"pid": "000003", "warranty": "10/10/2025", "status": true},
//             {"pid": "000004", "warranty": "10/10/2025", "status": true},
//             {"pid": "000005", "warranty": "10/10/2025", "status": true},
//             {"pid": "000006", "warranty": "10/10/2025", "status": true},
//             {"pid": "000007", "warranty": "10/10/2025", "status": true},
//             {"pid": "000008", "warranty": "10/10/2025", "status": true}
//           ]
//         }
//       },
//       {
//         "title": "Keyboard",
//         "index": 4
//       },
//       {
//         "title": "Mouse"
//       },
//       {
//         "title": "UPS"
//       },
//       {
//         "title": "TV"
//       },
//       {
//         "title": "Tablet"
//       },
//       {
//         "title": "Others"
//       },
//       {
//         "title": "Others"
//       },
//       {
//         "title": "Others"
//       },
//       {
//         "title": "Others"
//       }
//     ]
//   }

//   console.log(buttonTitle );
//   // console.log(Object.keys(buttonTitle).length);

//   return (
//     <div className='w-full h-full flex flex-col relative'>
//         <p className=" bg-[--title-bg] py-2 px-5 mb-0 max-sm:pl-1 text-3xl text-[--title-text] font-light max-sm:text-base sticky top-[0vh]">
//           <span className="border-l-4 border-[--sidebar-color] px-4 p-0 flex w-fit h-fit delay-300 duration-200 overflow-hidden"><p className="animate-slide p-2">Inventory</p></span>
//         </p>
//         <div className='w-full h-full flex flex-row border-t border-[--sidebar-bg]'>
//           <div className='w-2/6 h-full flex flex-col items-center gap-4 border-r border-[--sidebar-bg] p-4 overflow-scroll'>
//             {buttonTitle.map((data,key)=>(
//               <button onClick={dataHandle} value={data[key].title} className='w-full h-fit bg-[--nav-bg] text-xl text-white py-4 rounded-md hover:scale-105 duration-200'>{data[key].title}</button>
//             ))
//             }
//           </div>
//           <div className='w-full h-full'>
//             <div>
//               <p></p>
//               {/* {
//                 buttonTitle.map((data,key)=>(
//                   <p>{Object.keys(buttonTitle[data.index]).length}</p>
//                 ))
//               } */}
//             </div>
//           </div>
//         </div>
//     </div>
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
          Bill: inputBill,
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
    <div className="w-full h-[90vh]  overflow-scroll ">
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

              <div className="w-full flex flex-col justify-center items-center ">
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
              <div className="w-full h-full flex flex-col gap-3 items-center mt-12">
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
