"use client"
import React from 'react'
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
const ApprovedRequests = () => {
  const [isAdmin, toggleIsAdmin] = useState(false);
  const [userEmail, setUserEmail]= useState("")
  const [ adminEmail, setAdminEmail]= useState("")
  const [approvedProducts, setApprovedProducts] =useState([]);
  
  const fetchApprovedProducts=async(email,user)=>{
    if(user==="admin"){
      const response = await fetch(`/api/getReviewProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          user:"admin",
          requestStatus:"approved"
        }),
      });
      const json = await response.json();
      console.log(json)
      setApprovedProducts(json.reviews);
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
          requestStatus:"approved"
        }),
      });
      const json = await response.json();
      console.log(json)
      setApprovedProducts(json.reviews);
    }
  }

  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    // console.log(decodedData);
    toggleIsAdmin(decodedData.user.isAdmin);
    if(decodedData.user.isAdmin){
        setAdminEmail(decodedData.user.email);
        fetchApprovedProducts(decodedData.user.email,"admin");
      }
      else{
        setUserEmail(decodedData.user.email);
        fetchApprovedProducts(decodedData.user.email,"team member");
      }
  }, []);
  return (
    <div>
    <div>
        Approved Requests for 
        {
            isAdmin?<span>Admin</span> : <span>Team member</span>
        }
        are:
    </div>
    <div>
      {approvedProducts.map((singleProduct)=>{
        return <div key={singleProduct._id} >
         { singleProduct?.productDetails?.productName}
        </div>
      })}
    </div>
</div>
  )
}

export default ApprovedRequests