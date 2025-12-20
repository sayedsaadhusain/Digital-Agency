import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'A' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                e.target.classList.contains('cursor-hover')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const ZOOM_FACTOR = 0.8;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: (mousePosition.x / ZOOM_FACTOR) - 8,
                    y: (mousePosition.y / ZOOM_FACTOR) - 8,
                    scale: isHovering ? 0.5 : 1,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border-2 border-primary rounded-full pointer-events-none z-[9998] mix-blend-difference"
                animate={{
                    x: (mousePosition.x / ZOOM_FACTOR) - 24,
                    y: (mousePosition.y / ZOOM_FACTOR) - 24,
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 1 : 0.5,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
            />
        </>
    );
};

export { CustomCursor };
