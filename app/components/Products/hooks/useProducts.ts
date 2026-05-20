import { useState, useEffect } from "react";
import axios from "axios";
import type { Product, ProductWithSlug } from "~/interfaces/products";

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
        if (mounted) {
          const mapped: ProductWithSlug[] = res.data.map((p) => ({
            ...p,
            slug: slugify(p.title),
          }));
          setData(mapped as ProductWithSlug[]);
        }
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

function slugify(s: string) {
  return s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function useProduct(idOrSlug?: number | string) {
  const [data, setData] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (idOrSlug === undefined || idOrSlug === null) return;
    let mounted = true;
    setLoading(true);

    const isNumeric = (v: any) => /^\d+$/.test(String(v));
    if (isNumeric(idOrSlug)) {
      axios
        .get<Product>(`https://fakestoreapi.com/products/${idOrSlug}`)
        .then((res) => {
          if (mounted) setData(res.data);
        })
        .catch((err) => {
          if (mounted) setError(err?.message ?? "Error fetching product");
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
    } else {
      // treat as slug
      axios
        .get<Product[]>(`https://fakestoreapi.com/products`)
        .then((res) => {
          if (!mounted) return;
          const found = res.data.find((p) => slugify(p.title) === String(idOrSlug));
          if (found) setData(found);
          else setData(undefined);
        })
        .catch((err) => {
          if (mounted) setError(err?.message ?? "Error fetching product");
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
    }

    return () => {
      mounted = false;
    };
  }, [idOrSlug]);

  return { data, loading, error } as const;
}
