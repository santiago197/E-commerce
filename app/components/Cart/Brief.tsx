import { type FC } from 'react';
import { Link } from 'react-router';
import { useCart } from '~/context/CartContext';

const Brief: FC = () => {
  const { state, removeItem, getTotalPrice } = useCart();

  if (!state.items || state.items.length === 0) {
    return <div>El carrito está vacío.</div>;
  }

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {state.items.map(({ product, quantity }) => (
          <li key={product.id} style={{ display: 'flex', gap: 12, padding: 8, borderBottom: '1px solid #eee', alignItems: 'center' }}>
            {product.image && <img src={product.image} alt={product.title} style={{ width: 64, height: 64, objectFit: 'contain' }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{product.title}</div>
              <div>${product.price} × {quantity} = ${(product.price * quantity).toFixed(2)}</div>
            </div>
            <div>
              <button onClick={() => removeItem(product.id)} aria-label={`Eliminar ${product.title}`}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12, fontWeight: 700 }}>
        Total: ${getTotalPrice().toFixed(2)}
      </div>

      <div style={{ marginTop: 12 }}>
        <Link to="/checkout"><button>Ir a Checkout</button></Link>
      </div>
    </div>
  );
};

export default Brief;
