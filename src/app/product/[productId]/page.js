"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const productId = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState({
    id:"",
    productName:"",
    price:"",
    department:"",
    image:"",
    productDescription:"",
  });
  const [isAdmin, toggleIsAdmin] = useState(false);
  const [userEmail, setUserEmail]= useState("")
  const [ adminEmail, setAdminEmail]= useState("")
  // department, id, image, price, productDescription, productName

  const handleSubmit=(e, isAdmin, productDetails)=>{
    e.preventDefault();
    if(isAdmin){
      handleSaveChanges();
    }
    else{
      handleSaveForReview(productDetails);
    }
  }

  const handleSaveChanges=(productDetails)=>{
    console.log("handleSaveChanges called")
  }

  const handleSaveForReview= async(product)=>{
    console.log("handleSaveForReview called",userEmail)
    const response = await fetch(`/api/productForReview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
        adminEmail: null,
        status:"pending",
        productDetails:product,
      }),
    });
    const json = await response.json();
    console.log(json)
    const statusCode = response.status;

    console.log(json.status)
    if(statusCode===201){
    toast.success("Item added for review!");
    }
    else  if(statusCode===400){
    toast.error(json.error);
    }
    else{
      toast.error("Failed to add the item!")
    }

  }

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const src = product.image;

  useEffect(() => {
    const productString = searchParams.get("product");
    let decodedProduct = null;
    if (productString) {
      try {
        decodedProduct = JSON.parse(decodeURIComponent(productString));
        console.log(decodedProduct.productName);
        console.log(decodedProduct.image);
        decodedProduct.image=decodedProduct.image.replace("images/","images%2F");
        console.log(decodedProduct.image)
        setProduct(decodedProduct);
      } catch (e) {
        console.error("Error parsing product data:", e);
      }
    }
  }, []);
  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    toggleIsAdmin(decodedData.user.isAdmin);
    if(decodedData.user.isAdmin){
      setAdmEmail(decodedData.user.email);
    }
    else{
      setUserEmail(decodedData.user.email);
    }
  }, []);

  //   department, id, image, price, productDescription, productName

  return (
    <div className="p-5 m-5 text-white bg-white">
      <ToastContainer/>
      <form className="grid justify-center ">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl ">
              Product details
            </h2>
            <div className="mt-1 text-sm leading-6 text-gray-600">
              {isAdmin ? (
                <p> You can directly edit these items as you are admin. </p>
              ) : (
                <p>An admin will approve any changes done to this product. </p>
              )}
            </div>

            <div className="mt-10 flex flex-row ">
              <div className="col-span-full mr-10 flex flex-col ">
                <label
                  htmlFor="photo"
                  className="block text-xl font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex flex-col items-center gap-x-3">
                  <div className="max-w-[200px] overflow-hidden h-auto ">
                    {/* <Image src={product?.image} alt="product" width={200} height={200} /> */}
                    <img
                      src={product.image}
                      alt="product"
                    />

                    {/* {product.image} */}
                  </div>
                  {/* <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" /> */}

                  <div>
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-xl font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        id="productname"
                        name="productname"
                        type="productname"
                        value={product.productName}
                        onChange={onChange}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="productDescription"
                    className="block text-xl font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="productDescription"
                      name="productDescription"
                      value={product.productDescription}
                      onChange={onChange}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {/* <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e)=>(handleSubmit(e,isAdmin,product))}
          >
            {isAdmin ? (
              <span>Save changes as admin</span>
            ) : (
              <span>Save changes for review</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default productId;
