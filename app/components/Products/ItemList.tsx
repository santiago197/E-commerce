import { memo } from 'react';
import type { Product } from '~/interfaces/products';
import Item from './Item';

interface ItemListProps {
  products?: Product[];
}

const ItemList = ({ products = [] }: ItemListProps) => {
  if (!products || products.length === 0) return <div>No hay productos disponibles.</div>;

  return (
    <div className="row g-3">
      {products.map((p) => (
        <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Item product={p} />
        </div>
      ))}
    </div>
  );
};

export default memo(ItemList);