import { memo } from 'react';
import type { Product } from '~/interfaces/products';
import Item from './Item';

interface ItemListProps {
  products?: Product[];
}

const ItemList = ({ products = [] }: ItemListProps) => {
  if (!products || products.length === 0) return <div>No hay productos disponibles.</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
      {products.map((p) => (
        <Item key={p.id} product={p} />
      ))}
    </div>
  );
};

export default memo(ItemList);