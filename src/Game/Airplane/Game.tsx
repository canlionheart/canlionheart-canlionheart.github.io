
import React, { useState, useRef } from 'react';
import Sky from './World/Sky';
import Flyer from './Object/Flyer';
import useUpdateFlyerPosition from './Object/useUpdateFlyerPosition';

export default function GameAirplane() {
    const flyerRef = useRef<HTMLDivElement>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const { top, bottom } = gameContainerRef?.current?.getBoundingClientRect() ?? { top: 0, bottom: 0 };
    const worldHeight = bottom - top;
    const updateFlyerPosition = useUpdateFlyerPosition(flyerRef, worldHeight);

    return (
        <div className="game-base" ref={gameContainerRef}>
            <Sky/>
            <Flyer worldHeight={worldHeight}/>
        </div>
    );
}