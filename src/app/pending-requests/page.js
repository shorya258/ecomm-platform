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
      `/pending-requests/${singlePendingProduct.product._id}?request=${requestString}`
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
    <div>
      <div>
        {pendingProducts.length === 0 ? (
          <div>No pending products yet!</div>
        ) : (
          <div className="flex flex-row" >
            {pendingProducts?.map((singlePendingProduct, key) => {
              return (
                <div
                  key={singlePendingProduct._id}
                  className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[300px] min-h-[400px] m-5 flex flex-col relative"
                >
                  <div href="/" className=" h-48 overflow-hidden ">
                    <img
                      className="rounded-t-lg w-full h-full object-cover "
                      src={singlePendingProduct.image}
                      alt="product card image"
                      width={200}
                    />
                  </div>
                  <div className="p-5" >
                  <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >{singlePendingProduct.productName}</div>
                  <div className="mb-10 font-normal text-gray-700 dark:text-gray-400 overflow-hidden" >{singlePendingProduct.productDescription}</div>
                  <div>Price: $ {singlePendingProduct.price}</div>
                  </div>
                  <button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
