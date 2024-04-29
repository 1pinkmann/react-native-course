import { useQuery } from "@tanstack/react-query";
import { fetchPizzas } from "../services/actions";

export default function usePizzas(search, filters) {
  const { data } = useQuery({
    queryKey: ['pizzas', search, filters],
    queryFn: () => fetchPizzas(search, filters)
  });

  return {
    products: data
  };
}