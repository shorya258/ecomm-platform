"use client";
import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ApprovedRequests from "../Components/ApprovedRequests";
import PendingRequests from "../Components/PendingRequests";
import RejectedRequests from "../Components/RejectedRequests";

const Product = () => {
  const [isAdmin, toggleIsAdmin] = useState(false);
  const [showRequests, setShowRequests] = useState("pending");

  const handleRequestsFilter = (e, val) => {
    e.preventDefault();
    setShowRequests(val);
    // showRequestedProducts(val);
  };

  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    console.log(decodedData);
    toggleIsAdmin(decodedData.user.isAdmin);
  }, []);
  return (
    <div className="flex flex-col m-4 ">
      {isAdmin ? <div> Hello admin!</div> : <div>Hello team member</div>}
      <div className="flex flex-row gap-3 max-w-0.8 border-b border-white pb-2">
        <button
          onClick={(e) => handleRequestsFilter(e, "pending")}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  "
        >
          Pending Requests
        </button>
        <button
          onClick={(e) => handleRequestsFilter(e, "accepted")}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Accepted Requests
        </button>
        <button
          onClick={(e) => handleRequestsFilter(e, "rejected")}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Rejected Requests
        </button>
      </div>
      <br/>
      <div>
        {showRequests === "accepted" && <ApprovedRequests />}
        {showRequests === "pending" && <PendingRequests />}
        {showRequests === "rejected" && <RejectedRequests />}
      </div>
    </div>
  );
};

export default Product;
