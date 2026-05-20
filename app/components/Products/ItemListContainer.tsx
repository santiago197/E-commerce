import { useState } from 'react';
import ItemList from './ItemList';
import useProducts from './hooks/useProducts';
import type { Product } from '~/interfaces/products';

interface Props {
  category?: string;
  greeting?: string;
}

export default function ItemListContainer({ category, greeting }: Props) {
  const { data, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (loading) return <div className="d-flex justify-content-center py-5"><div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const filtered: Product[] = category
    ? (data as Product[]).filter((p) => String(p.category).toLowerCase() === String(category).toLowerCase())
    : (data as Product[]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = filtered.slice(startIndex, endIndex);

  function goToPage(page: number) {
    const p = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <section>
      {greeting && <h2>{greeting}</h2>}
      <ItemList products={paginated} />

      {totalPages > 1 && (
        <nav aria-label="Paginación" className="mt-4 d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Anterior</button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <li key={p} className={`page-item ${p === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => goToPage(p)}>{p}</button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Siguiente</button>
            </li>
          </ul>
        </nav>
      )}
    </section>
  );
}