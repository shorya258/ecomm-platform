"use client"
import React from 'react'
const PendingRequests = ({pendingProducts}) => {
  return (
    <div>
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