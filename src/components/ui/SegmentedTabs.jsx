import React from 'react';
import { cn } from '../../utils/helpers';

/** Segmentli kontrol — iOS tarzı kaydıran sekme. */
const SegmentedTabs = ({ tabs, active, onChange, className }) => (
    <div role="tablist" className={cn('inline-flex rounded-full border border-neutral-200 bg-neutral-100/80 p-1', className)}>
        {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
                <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        'flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-300',
                        isActive
                            ? 'bg-white text-neutral-900 shadow-[0_1px_4px_rgba(33,30,42,0.1),0_0_0_1px_rgba(33,30,42,0.04)]'
                            : 'text-neutral-500 hover:text-neutral-800 hover:bg-white/50'
                    )}
                >
                    {tab.icon && <tab.icon size={15} strokeWidth={2.2} />}
                    {tab.emoji && <span className="text-sm leading-none">{tab.emoji}</span>}
                    {tab.label}
                </button>
            );
        })}
    </div>
);

export default SegmentedTabs;
