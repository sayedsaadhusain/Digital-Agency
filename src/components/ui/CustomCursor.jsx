import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        if (!cursorRef.current) return;

        // Mobile check
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return;
        }

        const cursor = cursorRef.current;
        const root = document.body;

        // State variables to track movement and rotation
        const position = {
            distanceX: 0,
            distanceY: 0,
            distance: 0,
            pointerX: 0,
            pointerY: 0,
        };
        let previousPointerX = 0;
        let previousPointerY = 0;
        let angle = 0;
        let previousAngle = 0;
        let angleDisplace = 0;
        const degrees = 57.296;
        const cursorSize = 20;

        // Initialize cursor styles
        Object.assign(cursor.style, {
            boxSizing: 'border-box',
            position: 'fixed',
            top: '0px',
            left: `${-cursorSize / 2}px`,
            zIndex: '2147483647',
            width: `${cursorSize}px`,
            height: `${cursorSize}px`,
            transition: '250ms, transform 100ms',
            userSelect: 'none',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        });
        cursor.removeAttribute("hidden");

        const rotate = (position) => {
            let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * degrees;

            previousAngle = angle;

            if (position.distanceX <= 0 && position.distanceY >= 0) {
                angle = 90 - unsortedAngle + 0;
            } else if (position.distanceX < 0 && position.distanceY < 0) {
                angle = unsortedAngle + 90;
            } else if (position.distanceX >= 0 && position.distanceY <= 0) {
                angle = 90 - unsortedAngle + 180;
            } else if (position.distanceX > 0 && position.distanceY > 0) {
                angle = unsortedAngle + 270;
            }

            if (isNaN(angle)) {
                angle = previousAngle;
            } else {
                if (angle - previousAngle <= -270) {
                    angleDisplace += 360 + angle - previousAngle;
                } else if (angle - previousAngle >= 270) {
                    angleDisplace += angle - previousAngle - 360;
                } else {
                    angleDisplace += angle - previousAngle;
                }
            }
            cursor.style.transform += ` rotate(${angleDisplace}deg)`;

            setTimeout(() => {
                let modAngle = angleDisplace >= 0 ? angleDisplace % 360 : 360 + angleDisplace % 360;
                if (modAngle >= 45 && modAngle < 135) {
                    cursor.style.left = `${-cursorSize}px`;
                    cursor.style.top = `${-cursorSize / 2}px`;
                } else if (modAngle >= 135 && modAngle < 225) {
                    cursor.style.left = `${-cursorSize / 2}px`;
                    cursor.style.top = `${-cursorSize}px`;
                } else if (modAngle >= 225 && modAngle < 315) {
                    cursor.style.left = '0px';
                    cursor.style.top = `${-cursorSize / 2}px`;
                } else {
                    cursor.style.left = `${-cursorSize / 2}px`;
                    cursor.style.top = '0px';
                }
            }, 0);
        };

        const move = (event) => {
            previousPointerX = position.pointerX;
            previousPointerY = position.pointerY;

            // Use client coordinates for fixed positioning
            position.pointerX = event.clientX;
            position.pointerY = event.clientY;

            position.distanceX = previousPointerX - position.pointerX;
            position.distanceY = previousPointerY - position.pointerY;

            position.distance = Math.sqrt(position.distanceY ** 2 + position.distanceX ** 2);

            cursor.style.transform = `translate3d(${position.pointerX}px, ${position.pointerY}px, 0)`;

            if (position.distance > 1) {
                rotate(position);
            } else {
                cursor.style.transform += ` rotate(${angleDisplace}deg)`;
            }
        };

        window.addEventListener('mousemove', move);

        return () => {
            window.removeEventListener('mousemove', move);
        };
    }, []);

    return (
        <div className="curzr" ref={cursorRef} hidden>
            {/* Arrow SVG */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0L20 20L10 15L0 20L10 0Z" fill="#3b82f6" />
            </svg>
        </div>
    );
};

export { CustomCursor };
