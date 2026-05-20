import { type FC } from 'react';
import { Link } from 'react-router';
import { useCart } from '~/context/CartContext';

const Brief: FC = () => {
  const { state, removeItem, getTotalPrice, incrementItem, decrementItem } = useCart();

  if (!state.items || state.items.length === 0) {
    return <div className="alert alert-info">El carrito está vacío.</div>;
  }

  return (
    <div>
      <div className="list-group">
        {state.items.map(({ product, quantity }) => (
          <div key={product.id} className="list-group-item d-flex align-items-center">
            {product.image && <img src={product.image} alt={product.title} style={{ width: 64, height: 64, objectFit: 'contain' }} />}
            <div className="ms-3 flex-grow-1">
              <div className="fw-semibold">{product.title}</div>
              <div className="text-muted">${product.price} × {quantity} = ${(product.price * quantity).toFixed(2)}</div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-sm btn-outline-secondary" onClick={() => decrementItem(product.id)} aria-label={`Disminuir ${product.title}`}>-</button>
              <div className="px-2">{quantity}</div>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => incrementItem(product.id)} aria-label={`Aumentar ${product.title}`}>+</button>
              <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => removeItem(product.id)} aria-label={`Eliminar ${product.title}`}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 fw-bold">Total: ${getTotalPrice().toFixed(2)}</div>

      <div className="mt-3">
        <Link to="/checkout" className="btn btn-primary">Ir a Checkout</Link>
      </div>
    </div>
  );
};

export default Brief;
