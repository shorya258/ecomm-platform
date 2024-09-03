"use client"
import React from 'react'

const RejectedRequests = ({rejectedProducts}) => {
  
  return (
    <div>
    <div>
      {rejectedProducts.map((singleProduct)=>{
        return <div key={singleProduct._id} >
         { singleProduct?.productDetails?.productName}
        </div>
      })}
    </div>
</div>
  )
}

export default RejectedRequests