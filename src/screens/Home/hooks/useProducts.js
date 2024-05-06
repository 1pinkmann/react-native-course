import { useQuery } from "@tanstack/react-query";
import { fetchPizzas } from "../services/actions";
import { useEffect, useState } from "react";

export default function useProducts(refreshing, search, filters) {
  const [page, setPage] = useState(1);
  const { data: queryData, isLoading } = useQuery({
    queryKey: ['pizzas', search, filters, page, refreshing],
    queryFn: () => fetchPizzas(page, search, filters)
  });

  const { data } = queryData ? queryData : { data: [], metaCount: 0 };
  const hasFilters = filters?.length;

  const [products, setProducts] = useState(data || []);

  const changePage = () => {
    if (data.length < 10 || search || hasFilters) return;

    setPage(page + 1);
  }

  useEffect(() => {
    setPage(1);
  }, [search, filters, refreshing]);

  useEffect(() => {
    if (!data?.length) return;

    if (page > 1 && !search && !hasFilters && !refreshing) {
      setProducts(state => [...state, ...data.filter(x => !state.map(s => s.id).includes(x.id))]);
    } else {
      setProducts(data);
    }
  }, [data, search, refreshing, filters]);

  return {
    products,
    isLoading,
    changePage,
    page
  };
}