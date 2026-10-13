'use client';

import { useEffect, useState } from 'react';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ENABLE_MOCKS === 'true') {
      import('@/mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
          quiet: true,
        }).then(() => {
          setIsReady(true);
          console.log('🎭 MSW activated - API mocks enabled');
        });
      });
    } else {
      setIsReady(true);
    }
  }, []);

  if (!isReady) {
    return null; // Ou un skeleton de chargement
  }

  return <>{children}</>;
}
