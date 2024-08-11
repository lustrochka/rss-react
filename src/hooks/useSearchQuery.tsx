import { useState, useEffect } from 'react';

export default function useSearchQuery(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  () => void,
] {
  const [query, setQuery] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedQuery = localStorage.getItem('searchString') || '';
      setQuery(storedQuery);
    }
  }, []);
  const saveToStorage = () => localStorage.setItem('searchString', query);
  return [query, setQuery, saveToStorage];
}
