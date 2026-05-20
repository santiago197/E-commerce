import type { Route } from "./+types/home";
import ItemListContainer from "../components/Products/ItemListContainer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tienda" },
    { name: "description", content: "Catálogo de productos" },
  ];
}

export default function Home() {
  return (
    <main className="p-4 container mx-auto">
      <h1>Catálogo</h1>
      <ItemListContainer />
    </main>
  );
}
