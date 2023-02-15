import { Product } from "../../types/Product";
import './ProductCard.scss';

interface Props {
  product: Product;
  openFormHandler: (arg0: string, arg1: object) => void;
}

export const ProductCard: React.FC<Props> = ({ product, openFormHandler }) => {
  return (
    <div className="card" data-cy="product-card">
      <div className="card-image">
          <img
            src={product.imageUrl}
            alt="Product image"
          />
    </div>

      <div className="media-content">
        <p className="title is-8">
          {product.name}
        </p>

        <button
          className="prod_buttn"
          onClick={() => openFormHandler('Update', product)}
        >
          *
        </button>
      </div>

      {/* <p className="comment">{product.comments?.map(el => el.description)}</p> */}
  </div>
  )
}
