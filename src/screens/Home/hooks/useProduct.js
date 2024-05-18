import { useState } from 'react'

export default function useProduct() {
  const [saved, setSaved] = useState(false);

  function toggleSaved() {
    setSaved(!saved);
  }

  return {
    saved,
    toggleSaved
  };
}
