import api from "../../../api";
import { BASE_URL } from "../../../constants";

export async function fetchPizzas (search, filters) {
  const response = await api.get(`${BASE_URL}/pizzas`);

  let data = response.data;

  if (filters?.length) {
    filters.forEach(([key, value]) => {
      data = data.filter(item => item[key] === value);
    });
  }

  if (search) {
    return data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
  } else {
    return data;
  }
}
