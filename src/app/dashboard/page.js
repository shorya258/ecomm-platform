"use client";
import { useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@/lib/fontawesome";
import { jwtDecode } from "jwt-decode";
import ProductCard from "../Components/ProductCard";
import React from "react";

const dashboard = () => {
  const [isAdmin, toggleIsAdmin] = useState(false);
  const [products, setProducts]=useState();
  const fetchProducts = async () => {
    const apiURL = "https://64e0caef50713530432cafa1.mockapi.io/api/products";
    const response = await fetch(apiURL);
    const productsRendered = await response.json();
    setProducts(productsRendered);
    console.log(productsRendered.image);
  };
  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    console.log(decodedData);
    toggleIsAdmin(decodedData.user.isAdmin);
  }, []);

  useEffect(()=>{
    fetchProducts();
  },[]);

  return (
    <div>
      <nav className="px-4 py-2 bg-indigo-900 min-h-10 text-2xl font-semibold flex flex-row justify-between ">
        <div> yooo </div>
        <div className="flex flex-row">
          <div>
            <FontAwesomeIcon icon={faUser} fontSize={30} />{" "}
          </div>
          <div>{isAdmin ? <p>admin</p> : <p>team member</p>}</div>
        </div>
      </nav>
      <main className="flex flex-row flex-wrap p-2" >
        {products?.map((product,key)=>(
          <div key={key} className="m-5 max-w-{300px}" >

            <ProductCard  product={product}  />
          </div>
        ))}
      </main>
    </div>
  );
};

export default dashboard;
