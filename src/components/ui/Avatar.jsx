import React from 'react';
import { cn } from '../../utils/helpers';

/** Anonim emoji avatarı — gerçek fotoğraf yok, gizlilik önce gelir. */
const Avatar = ({ emoji = '🦋', color = '#6A52DC', size = 40, ring = false, className }) => (
    <span
        aria-hidden
        style={{ width: size, height: size, background: `${color}1f`, fontSize: size * 0.52 }}
        className={cn(
            'inline-flex items-center justify-center rounded-full select-none shrink-0',
            ring && 'ring-2 ring-white shadow-[0_0_0_3px_rgba(106,82,220,0.18)]',
            className
        )}
    >
        {emoji}
    </span>
);

export default Avatar;
