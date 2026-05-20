import { type FC } from "react";
import { Link } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "~/context/CartContext";

const CartWidget: FC = () => {
  const { getTotalItems } = useCart();
  const count = getTotalItems();

  return (
    <Link to="/cart" aria-label="Ver carrito" className="d-inline-flex align-items-center text-decoration-none text-dark">
      <FaShoppingCart size={20} />
      <span className="badge bg-danger ms-2">{count}</span>
    </Link>
  );
};

export default CartWidget;
