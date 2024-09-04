import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const ProductCard = ({ product }) => {
    const router=useRouter();
  const { productName, price, image, productDescription, department,id } = product;
  const navigateToProductPage=()=>{
    const productString=encodeURIComponent(JSON.stringify(product));
    router.push(`product/${id}?product=${productString}`)
  }
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[300px] min-h-[400px] m-5 flex flex-col relative">
      <div href="/" className=" h-48 overflow-hidden ">
        <img
          className="rounded-t-lg w-full h-full object-cover "
          src={image}
          alt="product card image"
          width={200}
        />
      </div>
      <div>
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {" "}
            {productName}{" "}
          </h5>
        </div>
        <p className="mb-10 font-normal text-gray-700 dark:text-gray-400 overflow-hidden ">
          {productDescription}
        </p>
        {/* <Link
        href
          onClick={navigateToProductPage}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit
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
        </Link> */}
        <button
          onClick={navigateToProductPage}
          className="absolute bottom-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          Edit
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
  );
};

export default ProductCard;
