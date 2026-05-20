import { useState } from 'react';
import Brief from './Brief';
import { useNavigate } from 'react-router';
import { useCart } from '~/context/CartContext';

export default function Checkout() {
  const { state, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    if (!name || !email || !address) return 'Completa todos los campos';
    // simple email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Email inválido';
    return '';
  };

  const handleConfirm = () => {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    // Emulate order finalization
    setSuccess('Compra realizada con éxito. Gracias por su compra.');
    clearCart();
    setTimeout(() => navigate('/'), 2000);
  };

  if (!state.items || state.items.length === 0) {
    return (
      <main className="p-4 container mx-auto">
        <h1>Checkout</h1>
        <div>El carrito está vacío.</div>
      </main>
    );
  }

  return (
    <main className="p-4 container mx-auto">
      <h1>Checkout</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        <section>
          <h2>Datos de envío</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input placeholder="Nombre" value={name} className="form-control" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" value={email} className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Dirección" value={address} className="form-control" onChange={(e) => setAddress(e.target.value)} />
          </div>

          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}

          <div style={{ marginTop: 12 }}>
            <button onClick={handleConfirm} className='btn btn-primary'>Confirmar compra</button>
            <button style={{ marginLeft: 8 }} onClick={() => navigate('/')} className='btn btn-outline-secondary'>
              Volver al catálogo
            </button>
          </div>
        </section>

        <aside>
          <h2>Resumen</h2>
          <Brief />
          <div style={{ marginTop: 12, fontWeight: 700 }}>Total a pagar: ${getTotalPrice().toFixed(2)}</div>
        </aside>
      </div>
    </main>
  );
}
