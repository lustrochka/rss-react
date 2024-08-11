import { useRouter } from 'next/router';

type UseSetQueryType = [URLSearchParams, (newParams: URLSearchParams) => void];

export function useSetQuery(): UseSetQueryType {
  const router = useRouter();
  const query = new URLSearchParams(router.asPath.split('?')[1]);

  const setQuery = (newParams: URLSearchParams) => {
    const currentPath = router.pathname;
    const params = Object.fromEntries(newParams);

    router.push({
      pathname: currentPath,
      query: params,
    });
  };
  return [query, setQuery];
}
