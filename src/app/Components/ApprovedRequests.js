"use client"
import React from 'react'
const ApprovedRequests = ({approvedProducts}) => {
  return (
    <div>
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