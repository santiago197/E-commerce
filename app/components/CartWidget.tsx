import { type FC } from "react";
import { Link } from "react-router";
import { FaShoppingCart } from "react-icons/fa";

interface CartWidgetProps {
  count?: number;
}

const CartWidget: FC<CartWidgetProps> = ({ count = 0 }) => {
  return (
    <Link to="/cart" aria-label="Ver carrito" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
      <FaShoppingCart size={20} />
      <span style={{
        display: "inline-block",
        minWidth: 20,
        padding: "2px 6px",
        marginLeft: 6,
        borderRadius: 12,
        background: "#dc3545",
        color: "white",
        fontSize: 12,
        textAlign: "center"
      }}>{count}</span>
    </Link>
  );
};

export default CartWidget;
