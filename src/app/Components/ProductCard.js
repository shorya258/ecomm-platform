import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
const ProductCard = ({ product }) => {
    const router=useRouter();
    const pathname=usePathname();
  const { productName, price, image, productDescription, department,id } = product;
  const navigateToProductPage=()=>{
    const productString=encodeURIComponent(JSON.stringify(product));
    console.log(`product/${id}?product=${productString}`);
    router.push(`product/${id}?product=${productString}`)
  }
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-64 min-h-150 ">
      <div href="/" className=" h-48 overflow-hidden ">
        <img
          className="rounded-t-lg w-full h-full object-cover "
          src={image}
          alt="product card image"
          width={200}
        />
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {" "}
            {productName}{" "}
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden ">
          {productDescription}
        </p>
        <button
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
        </button>
        {/* <Link
          href={{
            pathname: `/product/${id}`,
            // query: { product: JSON.stringify(product) },
          }}
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
      </div>
    </div>
  );
};

export default ProductCard;
