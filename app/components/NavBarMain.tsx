import { memo, type FC } from 'react';
import { Link } from 'react-router';
import CartWidget from './CartWidget';

interface NavBarMainProps {
  title?: string;
}

const NavBarMain: FC<NavBarMainProps> = ({ title = 'Mi Tienda' }) => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #eee' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="/logo.avif" alt="Logo" style={{ height: 40 }} />
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Catálogo</Link>
        <CartWidget />
      </div>
    </nav>
  );
};

export default memo(NavBarMain);