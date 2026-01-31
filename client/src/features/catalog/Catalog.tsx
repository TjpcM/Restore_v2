
import type { Product } from "../../app/models/products";
import  ProductList from "./ProductList";

type Props = {
  products: Product[];
}
export default function Catalog({products} :Props) {
  
  return (
  <>
        <ProductList products={products} />
    </>
  );
}
