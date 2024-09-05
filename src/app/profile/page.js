"use client";
import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import ReviewedProductCard from "../Components/ReviewedProductCard";
const Profile = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [isAdmin, toggleIsAdmin] = useState(false);
  const [showRequests, setShowRequests] = useState("pending");
  const [pendingProducts, setPendingProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]);

  const handleRequestsFilter = (e, val) => {
    e.preventDefault();
    setShowRequests(val);
    const email = isAdmin ? adminEmail : userEmail;
    const user = isAdmin ? "admin" : "team member";
    if (showRequests === "pending") {
      console.log(email, user);
      fetchPendingProducts(email, user);
    } else if (showRequests === "approved") {
      fetchApprovedProducts(email, user);
    } else {
      fetchRejectedProducts(email, user);
    }
  };

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
    console.log(decodedData);
    toggleIsAdmin(decodedData.user.isAdmin);
    if (decodedData.user.isAdmin) {
      setAdminEmail(decodedData.user.email);
      fetchAllData(decodedData.user.email, "admin");
    } else {
      setUserEmail(decodedData.user.email);
      fetchAllData(decodedData.user.email, "team member");
    }
  }, []);

  return (
    <div className="flex flex-col m-4 ">
      <div className="flex flex-row justify-between">
        <div className="flex ">
          <button
            onClick={() => router.push("/dashboard")}
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
            Dashboard
          </button>
          {isAdmin ? (
            <div className="flex flex-row justify-between mx-4">
              <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Hello admin!
              </div>
            </div>
          ) : (
            <div className="flex flex-row">
              <div className="mr-3 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Hello team member
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => {
              isAdmin
                ? router.push("/pending-requests")
                : router.push("/profile/my-submissions");
            }}
            className="inline-flex items-center mb-3 px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            {isAdmin ? "Show all pending requests" : "Show all submissions"}
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
      <div className="flex flex-row gap-3 max-w-0.8 border-b border-white pb-2">
        <button
          onClick={(e) => handleRequestsFilter(e, "pending")}
          className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
            ${showRequests === "pending" ? "border-solid border-2 border-white" : ""}
            `}
        >
          Pending Requests{" "}
          <span className="ml-2"> {pendingProducts.length} </span>
        </button>
        <button
          onClick={(e) => handleRequestsFilter(e, "approved")}
          className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-indigo-600  bg-indigo-600hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            showRequests === "approved" ? "border-solid border-2 border-white " : ""
          }`}
        >
          Approved Requests{" "}
          <span className="ml-2"> {approvedProducts.length} </span>
        </button>
        <button
          onClick={(e) => handleRequestsFilter(e, "rejected")}
          className={` flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            showRequests === "rejected" ? "border-solid border-2 border-white " : ""
          } `}
        >
          Rejected Requests{" "}
          <span className="ml-2"> {rejectedProducts.length} </span>
        </button>
      </div>
      <br />
      <div>
        {showRequests === "approved" &&
          (approvedProducts.length === 0 ? (
            <div className="text-3xl font-extrabold text-center ">
              You have no approved products to display!
            </div>
          ) : (
            <div className="flex flex-row flex-wrap">
              {approvedProducts?.map((singleProduct) => {
                return (
                  <ReviewedProductCard
                    key={singleProduct._id}
                    singleProduct={singleProduct}
                    user={isAdmin ? "admin" : "team member"}
                    requestStatus={"approved"}
                    email={isAdmin ? adminEmail : userEmail}
                    fetchAllData={fetchAllData}
                  />
                );
              })}
            </div>
          ))}
        {showRequests === "pending" &&
          (pendingProducts.length === 0 ? (
            <div className="text-3xl font-extrabold text-center ">
              You have no pending products to display!
            </div>
          ) : (
            <div className="flex flex-row flex-wrap ">
              {pendingProducts?.map((singleProduct) => {
                return (
                  <ReviewedProductCard
                    key={singleProduct._id}
                    singleProduct={singleProduct}
                    user={isAdmin ? "admin" : "team member"}
                    requestStatus={"pending"}
                    email={isAdmin ? adminEmail : userEmail}
                    fetchAllData={fetchAllData}
                  />
                );
              })}
            </div>
          ))}
        {showRequests === "rejected" &&
          (rejectedProducts.length === 0 ? (
            <div className="text-3xl font-extrabold text-center ">
              You have no rejected products to display!
            </div>
          ) : (
            <div className="flex flex-row flex-wrap ">
              {rejectedProducts?.map((singleProduct) => {
                return (
                  <ReviewedProductCard
                    key={singleProduct._id}
                    singleProduct={singleProduct}
                    user={isAdmin ? "admin" : "team member"}
                    requestStatus={"rejected"}
                    email={isAdmin ? adminEmail : userEmail}
                    fetchAllData={fetchAllData}
                  />
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
