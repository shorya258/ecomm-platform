"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
const productId = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState({
    id:"",
    productName:"",
    image:"",
    productDescription:"",
    department:"",
    price:""
  });
  const [isAdmin, toggleIsAdmin] = useState(false);
  const onChange=()=>{
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const productString = searchParams.get("product");
    let decodedProduct = null;
    if (productString) {
      try {
        decodedProduct = JSON.parse(decodeURIComponent(productString));
        console.log(decodedProduct.image);
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
  }, []);

//   department, id, image, price, productDescription, productName

  return (
    <div className="p-5 m-5 text-white bg-white" >

    <form className="grid justify-center " >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Product details</h2>
          <div className="mt-1 text-sm leading-6 text-gray-600">
            {
              isAdmin?
              <p> You can directly edit these items as you are admin. </p>:
              <p>An admin will approve any changes done to this product.  </p>
            }
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
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
              <label htmlFor="productDescription" className="block text-sm font-medium leading-6 text-gray-900">
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

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">

                <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>

    </div>
  );
};

export default productId;
