import api from "../../../api";
import { BASE_URL } from "../../../constants";

export async function fetchPizzas (page = 1, search, filters) {
  const pageOffset = 10;
  const response = await api.get(`${BASE_URL}/pizzas`);

  let data = search || filters?.length ? response.data : response.data.slice((page - 1) * pageOffset, page * pageOffset);

  if (filters?.length) {
    filters.forEach(([key, value]) => {
      data = data.filter(item => item[key] === value);
    });
  }

  if (search) {
    data = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
  } else {
    data = data;
  }

  return {
    data,
    metaCount: response.data.length
  }
}
