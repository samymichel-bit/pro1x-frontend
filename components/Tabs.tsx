'use client';

import { cn } from '@/lib/utils';
import type { CouponClass } from '@/types';

interface TabsProps {
  activeTab: CouponClass;
  onTabChange: (tab: CouponClass) => void;
}

const tabs: { value: CouponClass; label: string }[] = [
  { value: 'safe', label: 'Safe' },
  { value: 'opportunite', label: 'Opportunités' },
  { value: 'risk', label: 'Risk' },
];

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex gap-2 p-1 bg-muted/30 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ease-out',
            activeTab === tab.value
              ? 'bg-primary text-white shadow-sm'
              : 'text-secondary/60 hover:text-secondary hover:bg-white/50'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
