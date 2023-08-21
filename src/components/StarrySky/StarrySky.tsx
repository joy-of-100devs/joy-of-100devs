"use client";

import * as React from 'react';

function random(min: number, max:number) {
    return Math.random() * (max - min) + min;
}

function StarrySky() {
    return <div className={'w-full h-full fixed z-[-1] bg-accent-1'}>
        {Array.from({length: 400}, (idx) => {
            return <Star key={idx}/>
        })}
    </div>;
}

function Star() {
    const [pos] = React.useState(() => {
        return {
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
        }
    })

    return <div className={"absolute"} style={{
        width: random(1, 5) + "px",
        filter: `blur(${random(1, 2)}px`,
        background: "#ffca67",
        aspectRatio: "1/1",
        borderRadius: "50%",
        opacity: random(70, 90) + "%",
        ...pos,
    }}>
    </div>
}

export default StarrySky;
