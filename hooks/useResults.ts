import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '@/lib/api';

export function useResults(date: string) {
  return useQuery({
    queryKey: ['results', date],
    queryFn: () => fetchResults(date),
    enabled: !!date,
  });
}
