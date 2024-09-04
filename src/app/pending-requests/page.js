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
  const navigateRequestIdPage=(singlePendingProduct)=>{
      const requestString=encodeURIComponent(JSON.stringify(singlePendingProduct));
      router.push(`/pending-requests/${singlePendingProduct.productDetails.id}?request=${requestString}`
        )}
  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    // console.log(decodedData);
    fetchPendingProducts(decodedData.user.email, "admin");
    setEmail(decodedData.user.email);
  }, []);
  return (
    <div>
      <div>
        {pendingProducts.length === 0 ? (
          <div>No pending products yet!</div>
        ) : (
          <div>
            {pendingProducts?.map((singlePendingProduct, key) => {
              return (
                <div key={singlePendingProduct._id}>
                  <div>{singlePendingProduct.productDetails.productName}</div>
                  <div>{singlePendingProduct.productDetails.id}</div>
                  <button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() =>navigateRequestIdPage(singlePendingProduct)}
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
