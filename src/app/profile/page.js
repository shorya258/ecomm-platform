"use client";
import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import ReviewedProductCard from "../Components/ReviewedProductCard";
const Profile = () => {
  const router= useRouter();
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
      {isAdmin ? <div> Hello admin!</div> : 
      <div>
        <div>Hello team member</div>
        {/* <Link href={{ pathname: '/profile/my-submissions', query: { pendingProducts: pendingProducts, } }} >Show all submissions</Link> */}
        <button onClick={()=>router.push("/profile/my-submissions")} >Show all submissions</button>
        </div>
      }
      <div className="flex flex-row gap-3 max-w-0.8 border-b border-white pb-2">
        <button
          onClick={(e) => handleRequestsFilter(e, "pending")}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  "
        >
          Pending Requests <span className=""> {pendingProducts.length} </span>
        </button>
        <button
          onClick={(e) => handleRequestsFilter(e, "approved")}
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
        {showRequests === "approved" &&
          (approvedProducts.length === 0 ? (
            <div>No approved products to display yet!</div>
          ) : (
            <div>
              {approvedProducts?.map((singleProduct) => {
                return (
                  <div key={singleProduct._id}>
                    <ReviewedProductCard
                      singleProduct={singleProduct}
                      user={isAdmin ? "admin" : "team member"}
                      requestStatus={"approved"}
                      email={isAdmin ? adminEmail : userEmail}
                      fetchAllData={fetchAllData}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        {showRequests === "pending" && (
          pendingProducts.length===0?<div>No pending products yet!</div>:<div>
          {pendingProducts?.map((singleProduct) => {
            return (
              <div key={singleProduct._id}>
                <ReviewedProductCard
                  singleProduct={singleProduct}
                  user={isAdmin ? "admin" : "team member"}
                  requestStatus={"pending"}
                  email={isAdmin ? adminEmail : userEmail}
                  fetchAllData={fetchAllData}
                />
              </div>
            );
          })}
        </div>
        )}
        {showRequests === "rejected" && (
          rejectedProducts.length===0?<div>No rejected products yet!</div>:
          <div>
            {rejectedProducts?.map((singleProduct) => {
              return (
                <div key={singleProduct._id}>
                  <ReviewedProductCard
                    singleProduct={singleProduct}
                    user={isAdmin ? "admin" : "team member"}
                    requestStatus={"rejected"}
                    email={isAdmin ? adminEmail : userEmail}
                    fetchAllData={fetchAllData}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
