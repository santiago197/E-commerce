import { type FC } from 'react';
import type { Product } from '~/interfaces/products';
import ItemQuantitySelector from './ItemQuantitySelector';

interface Props {
  product: Product;
}

const ItemDetail: FC<Props> = ({ product }) => {
  return (
    <article className="item-detail">
      {product.image && (
        <img src={product.image} alt={product.title} />
      )}

      <div className="item-detail-content">
        <h1 style={{ marginTop: 0 }}>{product.title}</h1>
        <div style={{ fontSize: 20, fontWeight: 700 }}>${product.price}</div>
        <div style={{ color: '#666', margin: '8px 0' }}>{product.category}</div>
        <p style={{ lineHeight: 1.5 }}>{product.description}</p>

        <div style={{ marginTop: 12 }}>
          <ItemQuantitySelector product={product} />
        </div>
      </div>
    </article>
  );
};

export default ItemDetail;
