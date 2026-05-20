import { memo, type FC } from 'react';
import { Link } from 'react-router';
import CartWidget from './CartWidget';

interface NavBarMainProps {
  title?: string;
}

const NavBarMain: FC<NavBarMainProps> = ({ title = 'Mi Tienda' }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/logo.avif" alt="Logo" style={{ height: 40, marginRight: 8 }} />
          <span>{title}</span>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="nav-link">Catálogo</Link>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default memo(NavBarMain);