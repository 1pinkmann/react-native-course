import { useQuery } from "@tanstack/react-query";
import { fetchPizzas } from "../services/actions";
import { useEffect, useState } from "react";

export default function useProducts(page, search, filters) {
  const { data, isLoading } = useQuery({
    queryKey: ['pizzas', search, filters, page],
    queryFn: () => fetchPizzas(page, search, filters)
  });

  const [products, setProducts] = useState(data || []);

  useEffect(() => {
    if (data?.length) {
      setProducts(state => {
        if (state.find(item => data.find(product => product.id === item.id))) {
          return state;
        } else {
          return [...state, ...data];
        }
      });
    }
  }, [data]);


  return {
    products,
    isLoading
  };
}