"use client";

import * as React from 'react';
import styles from './styles.module.css';

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function StarrySky() {
    return <div className={'w-full h-full fixed z-[-1] bg-accent-1'}>
        {Array.from({length: 200}, (_, idx) => {
            return <Star key={idx}/>;
        })}
    </div>;
}

function Star() {
    const pos = React.useMemo(() => {
        return {
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            width: `max(${random(0.2, 0.6)}vmin, 2px)`,
            // filter: `blur(${random(0.025, 0.1)}vmin)`,
            opacity: random(70, 90) + "%",
            animationDelay: random(0, 1) + "s",
            animationDuration: random(2, 4) + "s",
        }
    }, []);

    // Cosmetic stuff only.
    return <div suppressHydrationWarning={true} className={styles.star} style={{
        ...pos,
    }}/>;
}

export default React.memo(StarrySky);
