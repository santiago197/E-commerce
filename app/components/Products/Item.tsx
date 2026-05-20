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
      <div className="card h-100">
        {product.image && (
          <img src={product.image} alt={product.title} className="card-img-top" style={{ height: 160, objectFit: 'contain' }} />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ fontSize: 14 }}>{product.title}</h5>
          <p className="card-text text-muted mb-2">{product.category}</p>
          <div className="fw-bold mb-3">${product.price}</div>

          <div className="mt-auto d-flex align-items-center gap-2">
            <button onClick={dec} aria-label="disminuir" className="btn btn-outline-secondary btn-sm"><span aria-hidden>-</span></button>
            <div className="px-2">{qty}</div>
            <button onClick={inc} aria-label="aumentar" className="btn btn-outline-secondary btn-sm"><span aria-hidden>+</span></button>
            <div className="ms-auto">
              <AddItemButton product={product} quantity={qty} />
            </div>
          </div>

          <Link to={`/product/${product.slug}`} className="btn btn-link mt-2 p-0">Ver más</Link>
        </div>
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