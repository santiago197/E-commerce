import type { Route } from "./+types/home";
import ItemListContainer from "../components/Products/ItemListContainer";
import useProducts from "../components/Products/hooks/useProducts";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tienda" },
    { name: "description", content: "Catálogo de productos" },
  ];
}

export default function Home() {
  const { data } = useProducts();
  const [category, setCategory] = useState<string | undefined>(undefined);

  const categories = Array.from(new Set((data || []).map((p) => p.category))).filter(Boolean) as string[];

  return (
    <main className="p-4 container mx-auto">
      <h1>Catálogo</h1>

      <div className="mb-3">
        <label className="form-label">Filtrar por categoría</label>
        <select className="form-select" value={category ?? ''} onChange={(e) => setCategory(e.target.value || undefined)}>
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <ItemListContainer category={category} greeting={category ? `Categoría: ${category}` : 'Bienvenido al catálogo'} />
    </main>
  );
}
