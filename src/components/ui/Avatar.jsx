import React from 'react';
import { cn } from '../../utils/helpers';

/** Anonim emoji avatarı — gerçek fotoğraf yok, gizlilik önce gelir. */
const Avatar = ({ emoji = '🦋', color = '#6A52DC', size = 40, ring = false, className }) => (
    <span
        aria-hidden
        style={{ width: size, height: size, background: `${color}1f`, fontSize: size * 0.52 }}
        className={cn(
            'inline-flex items-center justify-center rounded-full select-none shrink-0',
            ring && 'ring-2 ring-white shadow-soft',
            className
        )}
    >
        {emoji}
    </span>
);

export default Avatar;
