import { useMutation } from '@tanstack/react-query';
import { recommendBankroll } from '@/lib/api';
import type { BankrollRequest, BankrollRecommendation } from '@/types';

export function useBankroll() {
  return useMutation<BankrollRecommendation, Error, BankrollRequest>({
    mutationFn: (payload) => recommendBankroll(payload),
  });
}
