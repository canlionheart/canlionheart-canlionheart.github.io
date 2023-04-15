
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import Sky from './World/Sky';
import Flyer from './Object/Flyer';
import Cloud from './Object/Cloud';
import { WorldObj } from './Object/WorldObj';
import { JsxElement } from 'typescript';
import useWorldObjs from './Hook/useWorldObjs';
import { randomUUID } from 'crypto';

export default function GameAirplane() {
    const flyerRef = useRef<HTMLDivElement>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const { top, bottom } = gameContainerRef?.current?.getBoundingClientRect() ?? { top: 0, bottom: 0 };
    const [worldHeight, setWorldHeight] = useState(0);
    const [worldObjs, addWorldObj, removeComponent] = useWorldObjs();
    
    useLayoutEffect(() => {
        const { top, bottom } = gameContainerRef?.current?.getBoundingClientRect() ?? { top: 0, bottom: 0 };
        const height = bottom - top;
        setWorldHeight(height);
      }, []);

      useEffect(() => {
        const intervalId = setInterval(() => {
          let newid = Date.now();
          addWorldObj(
            {
              id: newid,
              onRemove: () => removeComponent(newid)
          }
          );
        }, 333);
    
        return () => clearInterval(intervalId);
      }, []);

    return (
        <div className="game-base" ref={gameContainerRef}>
            <Sky/>
            <Flyer worldHeight={worldHeight}/>
            {worldObjs.map((worldObj) => (
                <Cloud
                key={worldObj.id}
                id={worldObj.id}
                onRemove={() => removeComponent(worldObj.id)}
                />
            ))}
        </div>
    );
}