"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import ReviewedProductCard from "@/app/Components/ReviewedProductCard";
const page = () => {
  const router = useRouter();
  const [email,setEmail]=useState("");
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
    <div>
  {
    (pendingProducts.length===0 && approvedProducts.length===0 && rejectedProducts.length===0)?<div>You have no products to display!</div>:
    <div>
          <div className="flex flex-row flex-wrap">
        {approvedProducts?.map((singleProduct) => {
          return (
            <div key={singleProduct._id} className="flex flex-row" >
              <ReviewedProductCard
                singleProduct={singleProduct}
                user={ "team member"}
                requestStatus={"approved"}
                email={email}
                fetchAllData={fetchAllData}
              />
            </div>
          );
        })}
        {pendingProducts?.map((singleProduct) => {
          return (
            <div key={singleProduct._id} className="flex flex-row" >
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
            <div key={singleProduct._id} className="flex flex-row" >
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
  }
    </div>
  );
};

export default page;
