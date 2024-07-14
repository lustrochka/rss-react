import { useState } from 'react';

export default function useSearchQuery(): [
  () => string,
  React.Dispatch<React.SetStateAction<string>>,
  () => void,
] {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem('searchString') || '';
  });
  const saveToStorage = () => localStorage.setItem('searchString', query);
  const getQuery = () => query;
  return [getQuery, setQuery, saveToStorage];
}