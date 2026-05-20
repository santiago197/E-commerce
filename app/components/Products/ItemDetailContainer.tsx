import { useParams } from 'react-router';
import useProducts, { useProduct } from './hooks/useProducts';
import ItemDetail from './ItemDetail';

export default function ItemDetailContainer() {
  const params = useParams() as { id?: string };
  const id = params.id ? Number(params.id) : undefined;

  const { data, loading, error } = useProduct(id);

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Producto no encontrado.</div>;

  return <ItemDetail product={data} />;
}
