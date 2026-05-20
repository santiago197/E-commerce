import { type FC, useState } from 'react';
import AddItemButton from './AddItemButton';
import type { Product } from '~/interfaces/products';
import { FaPlus, FaMinus } from 'react-icons/fa';

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
    <div className="qty-container">
      <button onClick={dec} aria-label="disminuir" className="qty-button"><FaMinus size={14} /></button>
      <div className="qty-count">{qty}</div>
      <button onClick={inc} aria-label="aumentar" className="qty-button"><FaPlus size={14} /></button>
      {product ? (
        <AddItemButton product={product} quantity={qty} />
      ) : (
        <button onClick={() => onAdd?.(qty)} style={{ marginLeft: 8 }} className="btn btn-sm btn-outline-primary">Agregar</button>
      )}
    </div>
  );
};

export default ItemQuantitySelector;
