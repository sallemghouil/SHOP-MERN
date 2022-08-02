import React from "react";
import { useSelector } from "react-redux";
import Product from "../Product/Product";

const ProductList = () => {
  const products = useSelector((state) => state.productReducer.products);
  return (
    <div style={{display:"flex",justifyContent:"space-evenly",flexWrap:"wrap",margin:"20px"}}>
      {products.map((el) => (
        <Product el={el} key={el._id} />
      ))}
    </div>
  );
};

export default ProductList;