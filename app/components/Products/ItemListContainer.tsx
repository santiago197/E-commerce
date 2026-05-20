import ItemList from './ItemList';
import useProducts from './hooks/useProducts';
import type { Product } from '~/interfaces/products';

interface Props {
  category?: string;
  greeting?: string;
}

export default function ItemListContainer({ category, greeting }: Props) {
  const { data, loading, error } = useProducts();

  if (loading) return <div className="d-flex justify-content-center py-5"><div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const filtered: Product[] = category
    ? (data as Product[]).filter((p) => String(p.category).toLowerCase() === String(category).toLowerCase())
    : (data as Product[]);

  return (
    <section>
      {greeting && <h2>{greeting}</h2>}
      <ItemList products={filtered} />
    </section>
  );
}