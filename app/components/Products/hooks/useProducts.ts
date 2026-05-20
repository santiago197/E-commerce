import { useState, useEffect } from "react";
import axios from "axios";
import type { Product } from "~/interfaces/products";

export default function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get<Product[]>("https://fakestoreapi.com/products")
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => {
        if (mounted) setError(err?.message ?? "Error fetching products");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error } as const;
}

export function useProduct(id?: number | string) {
  const [data, setData] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === undefined || id === null) return;
    let mounted = true;
    setLoading(true);
    axios
      .get<Product>(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => {
        if (mounted) setError(err?.message ?? "Error fetching product");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  return { data, loading, error } as const;
}
