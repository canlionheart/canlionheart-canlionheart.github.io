
import React, { useState, useRef, useLayoutEffect } from 'react';
import Sky from './World/Sky';
import Flyer from './Object/Flyer';

export default function GameAirplane() {
    const flyerRef = useRef<HTMLDivElement>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const { top, bottom } = gameContainerRef?.current?.getBoundingClientRect() ?? { top: 0, bottom: 0 };
    const [worldHeight, setWorldHeight] = useState(0);
    
    useLayoutEffect(() => {
        const { top, bottom } = gameContainerRef?.current?.getBoundingClientRect() ?? { top: 0, bottom: 0 };
        const height = bottom - top;
        setWorldHeight(height);
      }, []);

    return (
        <div className="game-base" ref={gameContainerRef}>
            <Sky/>
            <Flyer worldHeight={worldHeight}/>
        </div>
    );
}