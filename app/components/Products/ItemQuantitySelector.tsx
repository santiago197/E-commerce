import { type FC, useState } from 'react';
import AddItemButton from './AddItemButton';
import type { Product } from '~/interfaces/products';

interface Props {
  onAdd?: (quantity: number) => void;
  product?: Product;
  initial?: number;
  max?: number;
}

const ItemQuantitySelector: FC<Props> = ({ onAdd, product, initial = 1, max = 99 }) => {
  const [qty, setQty] = useState<number>(initial);
  const inc = () => setQty((q) => Math.min(max, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button onClick={dec} aria-label="disminuir">-</button>
      <div style={{ minWidth: 28, textAlign: 'center' }}>{qty}</div>
      <button onClick={inc} aria-label="aumentar">+</button>
      {product ? (
        <AddItemButton product={product} quantity={qty} />
      ) : (
        <button onClick={() => onAdd?.(qty)} style={{ marginLeft: 8 }}>Agregar</button>
      )}
    </div>
  );
};

export default ItemQuantitySelector;
