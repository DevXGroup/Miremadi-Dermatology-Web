import React from 'react';
import { cn } from '../../lib/utils';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <img
            src="/Miremadi-logo.webp"
            alt="Miremadi Dermatology Logo"
            className={cn("object-contain", className)}
        />
    );
};
