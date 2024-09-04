"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import ReviewedProductCard from "@/app/Components/ReviewedProductCard";
const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pendingProducts, setPendingProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]);
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
    // console.log(json);
    setPendingProducts(json.reviews);
  };
  const fetchApprovedProducts = async (email, user) => {
    const response = await fetch(`/api/getReviewProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        user,
        requestStatus: "approved",
      }),
    });
    const json = await response.json();
    // console.log(json);
    setApprovedProducts(json.reviews);
  };
  const fetchRejectedProducts = async (email, user) => {
    const response = await fetch(`/api/getReviewProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        user,
        requestStatus: "rejected",
      }),
    });
    const json = await response.json();
    // console.log(json);
    setRejectedProducts(json.reviews);
  };

  const fetchAllData = async (email, userType) => {
    fetchPendingProducts(email, userType);
    fetchApprovedProducts(email, userType);
    fetchRejectedProducts(email, userType);
  };
  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    setEmail(decodedData.user.email);
    // console.log(decodedData);
    // toggleIsAdmin(decodedData.user.isAdmin);
    fetchAllData(decodedData.user.email, "team member");
  }, []);
  return (
    <div className="flex flex-col mt-3" >
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
      <div className="flex justify-center items-center  ">
        {pendingProducts.length === 0 &&
        approvedProducts.length === 0 &&
        rejectedProducts.length === 0 ? (
          <div className="text-3xl font-extrabold ">
            You have no products to display!
          </div>
        ) : (
          <div>
            <div className="flex flex-row flex-wrap">
              {approvedProducts?.map((singleProduct) => {
                return (
                  <div key={singleProduct._id} className="flex flex-row">
                    <ReviewedProductCard
                      singleProduct={singleProduct}
                      user={"team member"}
                      requestStatus={"approved"}
                      email={email}
                      fetchAllData={fetchAllData}
                    />
                  </div>
                );
              })}
              {pendingProducts?.map((singleProduct) => {
                return (
                  <div key={singleProduct._id} className="flex flex-row">
                    <ReviewedProductCard
                      singleProduct={singleProduct}
                      user={"team member"}
                      requestStatus={"pending"}
                      email={email}
                      fetchAllData={fetchAllData}
                    />
                  </div>
                );
              })}
              {rejectedProducts?.map((singleProduct) => {
                return (
                  <div key={singleProduct._id} className="flex flex-row">
                    <ReviewedProductCard
                      singleProduct={singleProduct}
                      user={"team member"}
                      requestStatus={"rejected"}
                      email={email}
                      fetchAllData={fetchAllData}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
