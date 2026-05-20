import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Product } from '~/interfaces/products';

type CartItem = {
  product: Product;
  quantity: number;
};

type State = {
  items: CartItem[];
};

type Action =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'CLEAR' };

const CartContext = createContext<{
  state: State;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
} | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + action.quantity } : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity }] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.product.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const addItem = (product: Product, quantity = 1) => dispatch({ type: 'ADD_ITEM', product, quantity });
  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', id });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  const getTotalItems = () => state.items.reduce((s, it) => s + it.quantity, 0);
  const getTotalPrice = () => state.items.reduce((s, it) => s + it.quantity * (it.product.price ?? 0), 0);

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, clearCart, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (ctx === undefined) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
