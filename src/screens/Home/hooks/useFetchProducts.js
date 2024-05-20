import { useQuery } from "@tanstack/react-query";
import { fetchPizzas } from "../services/actions";
import { useEffect } from "react";

export default function useFetchProducts(productsStore, refreshing, search, filters) {
  const { data: queryData, isLoading } = useQuery({
    queryKey: ['pizzas', search, filters, productsStore.page, refreshing],
    queryFn: () => fetchPizzas(productsStore.page, search, filters)
  });

  const { data } = queryData ? queryData : { data: [], metaCount: 0 };
  const hasFilters = filters?.length;

  const changePage = () => {
    if (data.length < 10 || search || hasFilters) return;

    productsStore.setPage(productsStore.page + 1);
  }

  useEffect(() => {
    productsStore.setPage(1);
  }, [search, filters, refreshing]);

  useEffect(() => {
    if (!data?.length) return;

    if (productsStore.page > 1 && !search && !hasFilters && !refreshing) {
      productsStore.setProducts(state => [...state, ...data.filter(x => !state.map(s => s.id).includes(x.id))]);
    } else {
      productsStore.setProducts(data);
    }
  }, [data, search, refreshing, filters]);

  return {
    products: productsStore.products,
    isLoading,
    changePage,
    page: productsStore.page
  };
}