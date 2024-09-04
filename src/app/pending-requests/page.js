"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
const PendingRequests = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pendingProducts, setPendingProducts] = useState([]);
  //   console.log(pendingProducts)
  const fetchPendingProducts = async (email, user) => {
    const response = await fetch(`/api/getReviewProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        user,
        requestStatus: "pending",
      }),
    });
    const json = await response.json();
    console.log(json.reviews);
    setPendingProducts(json.reviews);
  };
  const navigateRequestIdPage = (singlePendingProduct) => {
    const requestString = encodeURIComponent(
      JSON.stringify(singlePendingProduct)
    );
    router.push(
      `/pending-requests/${singlePendingProduct.productDetails.id}?request=${requestString}`
    );
  };
  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    // console.log(decodedData);
    fetchPendingProducts(decodedData.user.email, "admin");
    setEmail(decodedData.user.email);
  }, []);
  return (
    <div className="mt-3" >
      <div >
      <button
        onClick={() => router.push("/profile")}
        className="inline-flex items-center mb-3 mr-2 px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
      >
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 mr-2"
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
            d="M13 5H1m0 0l4-4m-4 4l4 4"
          />
        </svg>
        Back to your profile
      </button>
      </div>
      <div className="justify-center items-center">
        {pendingProducts.length === 0 ? (
          <div className="text-3xl font-extrabold ">
          You have no products to display!
        </div>
        ) : (
          <div className="flex flex-wrap justify-center " >
            {pendingProducts?.map((singlePendingProduct, key) => {
              return (
                <div
                  key={singlePendingProduct._id}
                  className="relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[300px] min-h-[500px] m-5 flex flex-col"
                >
                  <div className=" h-48 overflow-hidden ">
                    <img
                      className="rounded-t-lg w-full h-full object-cover "
                      src={singlePendingProduct.productDetails.image}
                      alt="product card image"
                      width={200}
                    />
                  </div>
                  <div className="p-5" >
                  <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >{singlePendingProduct.productDetails.productName}</div>
                  <div className="mb-10 font-normal text-gray-700 dark:text-gray-400 overflow-hidden" >{singlePendingProduct.productDetails.productDescription}</div>
                  <div>Price: $ {singlePendingProduct.productDetails.price}</div>
                  </div>
                  <button
                    className="absolute bottom-0 m-3 rounded-md bg-indigo-600  px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => navigateRequestIdPage(singlePendingProduct)}
                  >
                    Manage this request
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;
