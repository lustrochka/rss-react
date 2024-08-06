import { useRouter } from 'next/router';

export function useSetQuery() {
  const router = useRouter();
  const setQuery = (newParams: URLSearchParams) => {
    const currentPath = router.pathname;
    const params = Object.fromEntries(newParams);

    router.push({
      pathname: currentPath,
      query: params,
    });
  };
  return setQuery;
}
