import React, { useEffect, useRef } from 'react';
import cartoonAirplane from './cartoonAirplane.png';
import styles from './Flyer.module.scss';
import useUpdateFlyerPosition from './useUpdateFlyerPosition';

interface FlyerProps {
    worldHeight: number;
  }

export default function Flyer({ worldHeight }: FlyerProps) {
  const flyerRef = useRef<HTMLDivElement>(null);
  const updateFlyerPosition = useUpdateFlyerPosition(flyerRef, worldHeight);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      updateFlyerPosition(event);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [updateFlyerPosition]);

  const style = {};

  return (
    <div className={styles.player} style={style} ref={flyerRef}>
      <img src={cartoonAirplane} alt="Error: Player sprite missing" />
    </div>
  );
}