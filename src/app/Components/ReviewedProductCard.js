import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ReviewedProductCard = ({singleProduct, user, requestStatus}) => {
  const router = useRouter();
//   const { productName, price, image, productDescription, department, id } =
//   singleProduct;
    console.log(singleProduct.productDetails.image);
const setChangeStatus=(status)=>{

}

  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-64 min-h-150 ">
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
          {user === "admin" && requestStatus === "pending" && (
            <div>
              <button
                onClick={()=>(setChangeStatus("approved"))}
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
                onClick={()=>(setChangeStatus("rejected"))}
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
