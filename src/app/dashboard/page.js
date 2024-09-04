"use client";
import { useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@/lib/fontawesome";
import { jwtDecode } from "jwt-decode";
import ProductCard from "../Components/ProductCard";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const dashboard = () => {
  const [isAdmin, toggleIsAdmin] = useState(false);
  const [products, setProducts] = useState();
  const router = useRouter();
  const fetchProducts = async () => {
    const response= await fetch('/api/displayProducts');
    const productsRendered = await response.json();
    setProducts(productsRendered.products);
    // console.log(productsRendered)
  };
  const addProduct = async (product) => {
    const response = await fetch(`/api/changeProductDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product:product
      }),
    });
    const json = await response.json();
    const statusCode = response.status;
    if (statusCode === 201) {
      console.log("Added");
      toast.success("added product successfully!");
      setTimeout(()=>(router.push('/login')),1500);
    } else if (statusCode === 400) {
      toast.error(json.error);
    } else {
      toast.error("Could not add product!");
    }
  };
  const handleLogOut = () => {
    setTimeout(() => toast.success("Logged out!"), 2000);
    localStorage.removeItem("authStorageToken");
    router.push("/login");
  };
  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    // console.log(decodedData);
    toggleIsAdmin(decodedData.user.isAdmin);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
       <ToastContainer /> 
      <nav className="px-4 py-2 bg-indigo-900 min-h-10 text-2xl font-semibold flex flex-col ">
        <div className="flex flex-row justify-between ">
          <div className="flex flex-row">
            <Link href="/profile" className="mr-3" >
              <FontAwesomeIcon icon={faUser} fontSize={20} />{" "}
            </Link>
            <div>{isAdmin ? <p>admin</p> : <p>team member</p>}</div>
          </div>
          <div>
            <button onClick={handleLogOut}>Logout</button>
          </div>
        </div>
      </nav>
      <main className="flex flex-row flex-wrap p-2">
        {products?.map((product, key) => (
          <ProductCard product={product} key={key} />
        ))}
      </main>
    </div>
  );
};

export default dashboard;
