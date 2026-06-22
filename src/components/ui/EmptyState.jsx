import React from 'react';
import { cn } from '../../utils/helpers';

const EmptyState = ({ icon: Icon, emoji, title, description, action, className }) => (
    <div className={cn('flex flex-col items-center justify-center px-6 py-16 text-center', className)}>
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-neutral-100 text-neutral-400">
            {emoji ? <span className="text-3xl">{emoji}</span> : Icon && <Icon size={28} strokeWidth={1.8} />}
        </div>
        <h3 className="mb-1.5 text-lg font-bold text-neutral-900">{title}</h3>
        {description && <p className="mb-6 max-w-sm text-sm leading-relaxed text-neutral-500">{description}</p>}
        {action}
    </div>
);

export default EmptyState;
