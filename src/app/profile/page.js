"use client";
import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ApprovedRequests from "../Components/ApprovedRequests";
import PendingRequests from "../Components/PendingRequests";
import RejectedRequests from "../Components/RejectedRequests";
const Product = () => {
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
    console.log(json);
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
    console.log(json);
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
    console.log(json);
    setRejectedProducts(json.reviews);
  };

  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    console.log(decodedData);
    toggleIsAdmin(decodedData.user.isAdmin);
    if (decodedData.user.isAdmin) {
      setAdminEmail(decodedData.user.email);
      fetchPendingProducts(decodedData.user.email, "admin");
      fetchApprovedProducts(decodedData.user.email, "admin");
      fetchRejectedProducts(decodedData.user.email, "admin");
    } else {
      setUserEmail(decodedData.user.email);
      fetchPendingProducts(decodedData.user.email, "team member");
      fetchApprovedProducts(decodedData.user.email, "team member");
      fetchRejectedProducts(decodedData.user.email, "team member");
    }
  }, []);
  return (
    <div className="flex flex-col m-4 ">
      {isAdmin ? <div> Hello admin!</div> : <div>Hello team member</div>}
      <div className="flex flex-row gap-3 max-w-0.8 border-b border-white pb-2">
        <button
          onClick={(e) => handleRequestsFilter(e, "pending")}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  "
        >
          Pending Requests <span className=""> {pendingProducts.length} </span>
        </button>
        <button
          onClick={(e) => handleRequestsFilter(e, "accepted")}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Approved Requests{" "}
          <span className=""> {approvedProducts.length} </span>
        </button>
        <button
          onClick={(e) => handleRequestsFilter(e, "rejected")}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Rejected Requests{" "}
          <span className=""> {rejectedProducts.length} </span>
        </button>
      </div>
      <br />
      <div>
        {showRequests === "accepted" && (
          <ApprovedRequests approvedProducts={approvedProducts} />
        )}
        {showRequests === "pending" && (
          <PendingRequests pendingProducts={pendingProducts} />
        )}
        {showRequests === "rejected" && (
          <RejectedRequests rejectedProducts={rejectedProducts} />
        )}
      </div>
    </div>
  );
};

export default Product;
