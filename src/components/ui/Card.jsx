import React from 'react';
import { cn } from '../../utils/helpers';

const Card = ({ hover = false, className, children, ...props }) => (
    <div className={cn('card', hover && 'card-hover', className)} {...props}>
        {children}
    </div>
);

export default Card;
