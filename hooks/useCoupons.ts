import { useQuery } from '@tanstack/react-query';
import { fetchDailyCoupons } from '@/lib/api';
import type { CouponClass } from '@/types';

export function useCoupons(classe: CouponClass) {
  return useQuery({
    queryKey: ['coupons', classe],
    queryFn: () => fetchDailyCoupons(classe),
  });
}
