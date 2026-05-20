import { memo, useState } from 'react';
import { useParams, Link } from 'react-router';
import type { Product } from '~/interfaces/products';
import { useProduct } from './hooks/useProducts';
import AddItemButton from './AddItemButton';

interface ItemProps {
  product?: Product;
}

const Item = ({ product: initialProduct }: ItemProps) => {
  const params = useParams() as { slug?: string };
  const [product, setProduct] = useState<Product | undefined>(initialProduct);
  const [qty, setQty] = useState(1);

  const slug = params.slug;
  const { data: fetchedProduct, loading } = useProduct(slug);

  // prefer prop product, otherwise the fetched one
  if (!product && fetchedProduct) setProduct(fetchedProduct);

  const inc = () => setQty((q) => Math.min(99, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));
  

  if (!product) return <div>{loading ? 'Cargando producto...' : 'Producto no encontrado'}</div>;

  // Si se recibe `product` como prop (lista), renderiza preview/card.
  if (initialProduct) {
    return (
      <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {product.image && (
          <img src={product.image} alt={product.title} style={{ width: '100%', height: 160, objectFit: 'contain' }} />
        )}
        <div style={{ fontSize: 14, fontWeight: 600 }}>{product.title}</div>
        <div style={{ color: '#444', fontWeight: 700 }}>${product.price}</div>
        <div style={{ color: '#666', fontSize: 13 }}>{product.category}</div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 'auto' }}>
          <button onClick={dec} aria-label="disminuir">-</button>
          <div>{qty}</div>
          <button onClick={inc} aria-label="aumentar">+</button>
          {/* Use AddItemButton for consistency */}
          <AddItemButton product={product} quantity={qty} />
        </div>

        <Link to={`/product/${product.slug}`} style={{ marginTop: 8, color: '#007bff' }}>Ver más</Link>
      </div>
    );
  }

  // Vista de detalle cuando se carga por ruta /product/:id
  return (
    <div style={{ display: 'flex', gap: 16, padding: 16 }}>
      {product.image && <img src={product.image} alt={product.title} style={{ width: 240, height: 240, objectFit: 'contain' }} />}
      <div>
        <h2>{product.title}</h2>
        <div style={{ fontWeight: 700, fontSize: 18 }}>${product.price}</div>
        <div style={{ color: '#666', marginBottom: 8 }}>{product.category}</div>
        <p>{product.description}</p>
        {product.rating && <div>Rating: {product.rating.rate} ({product.rating.count})</div>}
      </div>
    </div>
  );
};

export default memo(Item);