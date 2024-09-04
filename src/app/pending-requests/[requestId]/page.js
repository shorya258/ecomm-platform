"use client"
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const requestId = () => {
  const searchParams = useSearchParams();
  const router=useRouter();
  const[email, setEmail]= useState("");
  const [pendingProduct, setPendingProduct]= useState([]);
  const[status, setStatus]=useState("pending")
  const setChangeStatus = async (changedStatus) => {

    // console.log("status changed to", singleProduct,email,changedStatus);

    const response = await fetch(`/api/changeReviewStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: pendingProduct,
        adminEmail: email,
        status: changedStatus,
      }),
    });
    const json = await response.json();
    const statusCode = response.status;
    if(statusCode===201){
      toast.success("product ", changedStatus)
      setStatus(changedStatus);
      router.push('/pending-requests')
    }
    console.log(json);

  };

  useEffect(() => {
    const requestString = searchParams.get("request");
    let decodedPendingProduct = null;
    if (requestString) {
      try {
        decodedPendingProduct = JSON.parse(decodeURIComponent(requestString));
        console.log(decodedPendingProduct.productDetails.image);
        decodedPendingProduct.productDetails.image = decodedPendingProduct.productDetails.image.replace(
          "images/",
          "images%2F"
        );
        decodedPendingProduct.productDetails.image = decodedPendingProduct.productDetails.image.replace(
          " ",
          "%20"
        );
        console.log(decodedPendingProduct.productDetails.image);
        setPendingProduct(decodedPendingProduct);
      } catch (e) {
        console.error("Error parsing product data:", e);
      }
    }
  }, []);

  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    // console.log(decodedData);
    // fetchPendingProducts(decodedData.user.email, "admin");
    setEmail(decodedData.user.email);
  }, []);

  // useEffect(()=>{

  // },[status])

  return (
    <div>
      <ToastContainer/>
      {
        console.log(pendingProduct.productDetails?.productName)
      }
      {pendingProduct.productDetails?.productName}
      <div>
              <button
                onClick={() => setChangeStatus("approved")}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Approve
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
              <button
                onClick={() => setChangeStatus("rejected")}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Reject
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
      </div>
  )
}

export default requestId