"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const requestId = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pendingProduct, setPendingProduct] = useState([]);
  const [status, setStatus] = useState("pending");
  const [highlightedValues, setHighlightedValues] = useState([]);
  const setChangeStatus = async (changedStatus) => {
    console.log("status changed to", changedStatus);
    const response = await fetch(`/api/changeReviewStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: pendingProduct,
        adminEmail: email,
        status: changedStatus,
      }),
    });
    const json = await response.json();
    const statusCode = response.status;
    if (statusCode === 201) {
      toast.success("product ", changedStatus);
      setStatus(changedStatus);
      router.push("/dashboard", { replace: true });
    }
    console.log(json);
  };
  const fetchProductUpdations = async () => {
    const response = await fetch(`/api/productUpdation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    const statusCode = response.status;
    console.log(res.productUpdations, "productUpdations");
    if (statusCode === 201) {
      console.log(pendingProduct);
      res.productUpdations.forEach((productUpdation) => {
        console.log(productUpdation.product, pendingProduct.product);
        if (productUpdation.product === pendingProduct.product) {
          setHighlightedValues(productUpdation.changedKeys);
        }
      });
    }
  };
  useEffect(() => {
    fetchProductUpdations();
  }, [pendingProduct]);
  useEffect(() => {
    const requestString = searchParams.get("request");
    let decodedPendingProduct = null;
    if (requestString) {
      try {
        decodedPendingProduct = JSON.parse(decodeURIComponent(requestString));
        console.log(decodedPendingProduct.image);
        decodedPendingProduct.image = decodedPendingProduct.image.replace(
          "images/",
          "images%2F"
        );
        decodedPendingProduct.image = decodedPendingProduct.image.replace(
          " ",
          "%20"
        );
        console.log(decodedPendingProduct.image);
        setPendingProduct(decodedPendingProduct);
      } catch (e) {
        console.error("Error parsing product data:", e);
      }
    }
  }, []);
  const checkHighlighted = (value) => {
    console.log(highlightedValues);
    console.log(value);
    highlightedValues.forEach((values) => {
      console.log(values === value);
    });
    return highlightedValues.includes(value);
  };
  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    // console.log(decodedData);
    // fetchPendingProducts(decodedData.user.email, "admin");
    setEmail(decodedData.user.email);
  }, []);

  // useEffect(()=>{

  // },[status])

  return (
    <div className="p-5 m-5 grid justify-center">
      <ToastContainer />
      {/* {pendingProduct.productDetails?.productName} */}
      <div className="grid justify-center bg-white rounded-xl p-10 ">
        <form className="grid justify-center text-gray-600 ">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl ">
                Product details
              </h2>
              <div className="mt-1 text-sm leading-6 text-gray-600">
                <p> Approve or reject changes done to this product! </p>
              </div>

              <div className="grid grid-rows-1 " >
              <div className="mt-10 flex flex-col items-center gap-x-3">
                    <div className="max-w-[200px] overflow-hidden h-auto ">
                      <img
                        src={pendingProduct.image}
                        className={
                          checkHighlighted("productImage")
                            ? `rounded-md border border-yellow-500`
                            : ""
                        }
                        alt="product"
                      />
                    </div>
                  </div>

              <div className="mt-10 flex flex-col ">
                
                <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:grid-rows-1">
                  <div className="sm:col-span-4 flex items-center">
                    <label
                      htmlFor="productName"
                      className="block text-xl font-medium leading-6 text-gray-900 mr-2"
                    >
                      Name
                    </label>
                    <div className={`${checkHighlighted("productName") ?"border-yellow-300 border-2 border-solid rounded-lg":"" }lock text-xl font-medium leading-6 text-gray-600`}>
                      {pendingProduct.productName}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4 flex items-center">
                  <label
                    htmlFor="price"
                    className="block text-xl font-medium leading-6 text-gray-900 mr-2"
                  >
                    Price 
                  </label>
                  <div className={`${checkHighlighted("price") ?"border-yellow-300 border-2 border-solid rounded-lg":"" }lock text-xl font-medium leading-6 text-gray-600`}>${pendingProduct.price}</div>
                </div>
                <div className="sm:col-span-4 flex items-center">
                  <label
                    htmlFor="price"
                    className="block text-xl font-medium leading-6 text-gray-900 mr-2"
                  >
                    Department
                  </label>
                  <div className={`${checkHighlighted("department") ?"border-yellow-300 border-2 border-solid rounded-lg":"" }lock text-xl font-medium leading-6 text-gray-600`}>{pendingProduct.department}</div>

                 
                </div>
              </div>
              <div className="col-span-full flex items-center text-wrap flex-wrap">
                    <label
                      htmlFor="productDescription"
                      className="block text-xl font-medium leading-6 text-gray-900 mr-2"
                    >
                      About
                    </label>
                    <div className={`${checkHighlighted("productDescription") ?"border-yellow-300 border-2 border-solid rounded-lg":"" }lock text-xl font-medium leading-6 text-gray-600`}>
                      {pendingProduct.productDescription}
                    </div>
                    {/* <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p> */}
                  </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center mt-4">
            <button
              onClick={() => setChangeStatus("approved")}
              className="inline-flex items-center mr-5 px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
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
              onClick={() => setChangeStatus("rejected")}
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
        </form>
      </div>
    </div>
  );
};

export default requestId;
