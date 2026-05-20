import { type FC } from 'react';
import type { Product } from '~/interfaces/products';
import { useCart } from '~/context/CartContext';

interface Props {
  product: Product;
  quantity?: number;
  onAdded?: () => void;
}

const AddItemButton: FC<Props> = ({ product, quantity = 1, onAdded }) => {
  const { addItem } = useCart();
  const handle = () => {
    addItem(product, quantity);
    onAdded?.();
  };

  return (
    <button onClick={handle} aria-label="Agregar al carrito">Agregar</button>
  );
};

export default AddItemButton;
