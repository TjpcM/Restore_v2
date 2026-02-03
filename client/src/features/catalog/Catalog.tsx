
import { useEffect, useState } from "react";
import type { Product } from "../../app/models/products";
import  ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";


export default function Catalog() {
   // Now we can use the generated hook in our component to fetch the products
    const {data, isLoading} = useFetchProductsQuery();
    
    if(isLoading || !data) return <div>Loading...</div>
  
  return (
  
<>
        <ProductList products={data} />
    </>
  );
}
