import React from 'react';
import { cn } from '../../utils/helpers';

const Spinner = ({ size = 24, className }) => (
    <span
        role="status"
        aria-label="Yükleniyor"
        style={{ width: size, height: size, borderWidth: Math.max(2, size / 10) }}
        className={cn(
            'inline-block rounded-full border-neutral-200 border-t-primary-600 animate-[spin_0.8s_linear_infinite]',
            className
        )}
    />
);

export default Spinner;
