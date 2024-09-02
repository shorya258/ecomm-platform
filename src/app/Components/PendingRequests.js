"use client"
import React from 'react'
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from 'react';
const PendingRequests = () => {
  const [isAdmin, toggleIsAdmin] = useState(false);
  const [userEmail, setUserEmail]= useState("")
  const [ adminEmail, setAdminEmail]= useState("")
  const [pendingProducts, setPendingProducts] =useState([]);
  
  const fetchPendingProducts=(email,user,status)=>{
    if(user==="admin"){

    }
    else{

    }
  }

  useEffect(() => {
    let authStorageToken = localStorage.getItem("authStorageToken");
    const decodedData = jwtDecode(authStorageToken);
    console.log(decodedData);
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

        </div>
    </div>
  )
}

export default PendingRequests