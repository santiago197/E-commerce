import { type FC } from 'react';
import type { Product } from '~/interfaces/products';
import { useCart } from '~/context/CartContext';
import { useToast } from '~/context/ToastContext';

interface Props {
  product: Product;
  quantity?: number;
  onAdded?: () => void;
}

const AddItemButton: FC<Props> = ({ product, quantity = 1, onAdded }) => {
  const { addItem } = useCart();
  const { push } = useToast();
  const handle = () => {
    addItem(product, quantity);
    push(`${product.title} agregado al carrito (${quantity})`);
    onAdded?.();
  };

  return (
    <button className="btn btn-primary btn-sm" onClick={handle} aria-label="Agregar al carrito">Agregar</button>
  );
};

export default AddItemButton;
