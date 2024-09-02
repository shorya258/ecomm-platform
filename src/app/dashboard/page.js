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
    // const apiURL = "/api/displayProducts";
    const apiURL = "https://64e0caef50713530432cafa1.mockapi.io/api/products";
    const response = await fetch(apiURL);
    const productsRendered = await response.json();
    setProducts(productsRendered);
  };
  const addProduct= async(product)=>{
    const response = await fetch(`/api/changeProductDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      id: product.id,
      productName: product.productName,
      department: product.department,
      productDescription: product.productDescription,
      price: product.price,
      image: product.image
      }),
    });
    const json = await response.json();
    const statusCode = response.status;
    if(statusCode===201){
      console.log("Added")
    // toast.success("added product successfully!");
    // setTimeout(()=>(router.push('/login')),3000);
    }
    else  if(statusCode===400){
    toast.error(json.error);
    }
    else{
      toast.error("Could not add product!")
    }
  }
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
