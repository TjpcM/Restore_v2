
import { useEffect, useState } from "react";
import type { Product } from "../../app/models/products";
import  ProductList from "./ProductList";


export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      fetch('https://localhost:5001/api/products')
        .then(response => response.json())
        .then(data => setProducts(data)); 
    }, []);//if there is no deopendency, runs once on mount
  
  
  return (
  <>
        <ProductList products={products} />
    </>
  );
}
