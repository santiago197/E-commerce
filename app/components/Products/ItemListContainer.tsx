import ItemList from './ItemList';
import useProducts from './hooks/useProducts';
import type { Product } from '~/interfaces/products';

interface Props {
  category?: string;
  greeting?: string;
}

export default function ItemListContainer({ category, greeting }: Props) {
  const { data, loading, error } = useProducts();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  const filtered: Product[] = category
    ? data.filter((p) => String(p.category).toLowerCase() === String(category).toLowerCase())
    : data;

  return (
    <section>
      {greeting && <h2>{greeting}</h2>}
      <ItemList products={filtered} />
    </section>
  );
}