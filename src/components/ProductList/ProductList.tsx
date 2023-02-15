import { Product } from "../../types/Product"
import { ProductCard } from "../ProductCard";
import './ProductList.scss';

interface Props {
  products: Product[];
  openFormHandler: (arg0: string, arg1: object) => void;
}

export const ProductList: React.FC<Props> = ({ products, openFormHandler }) => {
  const sorted = products.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="products-con">
      {sorted.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          openFormHandler={openFormHandler}
        />
      ))}
    </div>
  )
}
