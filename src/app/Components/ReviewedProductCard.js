import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ReviewedProductCard = ({ singleProduct, user, requestStatus,email,fetchAllData }) => {
  const router = useRouter();
  const[status, setStatus]=useState(requestStatus)
  const setChangeStatus = async (changedStatus) => {

    // console.log("status changed to", singleProduct,email,changedStatus);

    const response = await fetch(`/api/changeReviewStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: singleProduct,
        adminEmail: email,
        status: changedStatus,
      }),
    });
    const json = await response.json();
    const statusCode = response.status;
    if(statusCode===201){
        setStatus(changedStatus);
    }
    console.log(json);

  };

useEffect(() => {
    fetchAllData(email,user)
}, [status])


  return (
    <div className="m-4 " >
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-64 min-h-[400px] ">
        <div href="/" className=" h-48 overflow-hidden ">
          <img
            className="rounded-t-lg w-full h-full object-cover "
            src={singleProduct.productDetails.image}
            alt="product card image"
            width={200}
          />
        </div>
        <div></div>
        <div className="p-5">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {" "}
              {singleProduct.productDetails.productName}{" "}
            </h5>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden ">
            {singleProduct.productDetails.productDescription}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden ">
            Price: ${singleProduct.productDetails.price}
          </p>
          {user === "admin" && requestStatus === "pending" && (
            <div>
              <button
                onClick={() => setChangeStatus("approved")}
                className="inline-flex items-center mr-5 px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewedProductCard;
