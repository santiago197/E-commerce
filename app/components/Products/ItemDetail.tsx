import { type FC } from 'react';
import type { Product } from '~/interfaces/products';
import ItemQuantitySelector from './ItemQuantitySelector';
import { useCart } from '~/context/CartContext';

interface Props {
  product: Product;
}

const ItemDetail: FC<Props> = ({ product }) => {
  const { addItem } = useCart();

  const handleAdd = (quantity: number) => {
    addItem(product, quantity);
  };

  return (
    <article style={{ display: 'flex', gap: 24, padding: 16 }}>
      {product.image && (
        <img src={product.image} alt={product.title} style={{ width: 320, height: 320, objectFit: 'contain' }} />
      )}

      <div style={{ maxWidth: 640 }}>
        <h1 style={{ marginTop: 0 }}>{product.title}</h1>
        <div style={{ fontSize: 20, fontWeight: 700 }}>${product.price}</div>
        <div style={{ color: '#666', margin: '8px 0' }}>{product.category}</div>
        <p style={{ lineHeight: 1.5 }}>{product.description}</p>

        <div style={{ marginTop: 12 }}>
          <ItemQuantitySelector onAdd={handleAdd} />
        </div>
      </div>
    </article>
  );
};

export default ItemDetail;
