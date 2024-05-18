import React, { createContext, useState } from 'react';
import useSearch from '../hooks/useSearch';

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [checked, setChecked] = useState(false);
  const search = useSearch();

  return (
    <SearchContext.Provider value={{ searchContext: search, filtersContext: { checked, setChecked } }}>
      {children}
    </SearchContext.Provider>
  )
}
