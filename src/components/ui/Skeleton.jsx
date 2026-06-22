import React from 'react';
import { cn } from '../../utils/helpers';

export const Skeleton = ({ className }) => <div className={cn('skeleton', className)} aria-hidden />;

export const CardSkeleton = () => (
    <div className="card p-6" aria-hidden>
        <div className="mb-4 flex items-center gap-3">
            <Skeleton className="h-10 w-10 !rounded-full" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-2.5 w-16" />
            </div>
        </div>
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="mb-2 h-3 w-full" />
        <Skeleton className="mb-6 h-3 w-5/6" />
        <div className="flex gap-3">
            <Skeleton className="h-8 w-16 !rounded-full" />
            <Skeleton className="h-8 w-16 !rounded-full" />
        </div>
    </div>
);

export const GridSkeleton = ({ count = 6 }) => (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
);
