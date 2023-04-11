import React, { useEffect, useRef, useState } from 'react';
import cartoonAirplane from './cartoonAirplane.png';
import styles from './Flyer.module.scss';
import useUpdateFlyerPosition from './useUpdateFlyerPosition';

interface FlyerProps {
    worldHeight: number;
  }

export default function Flyer({ worldHeight }: FlyerProps) {
  const flyerRef = useRef<HTMLDivElement>(null);
  const updateFlyerPosition = useUpdateFlyerPosition(flyerRef, worldHeight);

  const [currentY, setCurrentY] = useState(0);

  const speed = 16;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      updateFlyerPosition(event);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [updateFlyerPosition]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const moveFlyer = () => {
      const flyerHeight = flyerRef.current?.getBoundingClientRect().height || 0;
      const newY = Math.min(0, -1 * worldHeight + Math.max(currentY, flyerHeight * 1.375));
      const currentTransform = flyerRef.current?.style.transform;
      const currentYPos = currentTransform ? parseFloat(currentTransform.split(',')[1]) : 0;
      const delta = (newY - currentYPos) * speed / 1000; // in pixels
      const nextY = currentYPos + delta;
      flyerRef.current!.style.transform = `translate(0, ${nextY}px)`;
    };

    intervalId = setInterval(moveFlyer, 16); // run every 16ms (about 60fps)

    return () => {
      clearInterval(intervalId);
    };
  }, [currentY, speed, worldHeight]);

  const style = {};

  return (
    <div className={styles.player} style={style} ref={flyerRef}>
      <img src={cartoonAirplane} alt="Error: Player sprite missing" />
    </div>
  );
}