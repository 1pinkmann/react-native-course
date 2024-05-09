import { useQuery } from "@tanstack/react-query";
import { fetchPizza } from "../services/actions";

export default function useFetchProduct(id) {
  const { data, isLoading } = useQuery({
    queryKey: [id],
    queryFn: () => fetchPizza(id)
  });

  return {
    product: data,
    isLoading
  };
}