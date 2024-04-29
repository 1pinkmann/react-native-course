import { useState } from "react";

export default function useSearch() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState('');

  function toggleSearchVisible() {
    setSearchVisible(!searchVisible);
  }

  function handleFilter(isAdd, filter, value) {
    setFilters(isAdd ? [...filters, [filter, value]] : filters.filter(item => item[0] !== filter));
  }

  return {
    searchVisible,
    toggleSearchVisible,
    search,
    setSearch,
    filters,
    setFilters,
    handleFilter
  }
}