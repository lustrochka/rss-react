'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type UseSetQueryType = [URLSearchParams, (newParams: URLSearchParams) => void];

export function useSetQuery(): UseSetQueryType {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams.toString());

  const setQuery = (newParams: URLSearchParams) => {
    router.push(`${pathname}?${newParams.toString()}`);
  };
  return [query, setQuery];
}
