import React from 'react'
const productId = ({params}) => {
    const { productId } = params;
    const decodedSlug = decodeURIComponent(productId);
  return (
    <div> 
        <div>
        {decodedSlug}
        </div>
    </div>
  )
}

export default productId