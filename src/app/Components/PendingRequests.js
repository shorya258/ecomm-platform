"use client"
import React from 'react'
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
const PendingRequests = () => {
  const [isAdmin, toggleIsAdmin] = useState(false);
  const [userEmail, setUserEmail]= useState("")
  const [ adminEmail, setAdminEmail]= useState("")
  const [pendingProducts, setPendingProducts] =useState([]);
  
  const fetchPendingProducts=async(email,user)=>{
    if(user==="admin"){
      const response = await fetch(`/api/getReviewProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          user:"admin",
          requestStatus:"pending"
        }),
      });
      const json = await response.json();
      console.log(json)
      setPendingProducts(json.reviews);
    }
    else{
      const response = await fetch(`/api/getReviewProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          user:"team member",
          requestStatus:"pending"
        }),
      });
      const json = await response.json();
      console.log(json)
      setPendingProducts(json.reviews);
    }
  }

  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    // console.log(decodedData);
    toggleIsAdmin(decodedData.user.isAdmin);
    if(decodedData.user.isAdmin){
        setAdminEmail(decodedData.user.email);
        fetchPendingProducts(decodedData.user.email,"admin");
      }
      else{
        setUserEmail(decodedData.user.email);
        fetchPendingProducts(decodedData.user.email,"team member");
      }
  }, []);
  return (
    <div>
        <div>
            Pending Requests for 
            {
                isAdmin?<span>Admin</span> : <span>Team member</span>
            }
            are:
        </div>
        <div>
          {pendingProducts.map((singleProduct)=>{
            return <div key={singleProduct._id} >
             { singleProduct?.productDetails?.productName}
            </div>
          })}
        </div>
    </div>
  )
}

export default PendingRequests