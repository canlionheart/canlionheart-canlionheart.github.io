import { useEffect, useRef, useState } from 'react';
import cartoonAirplane from '../Sprite/Player/cartoonAirplane.png';
import styles from './Flyer.module.scss';

interface FlyerProps {
    worldHeight: number;
  }

export default function Flyer({ worldHeight }: FlyerProps) {
  const speed = 8;
  const flyerRef = useRef<HTMLDivElement>(null);
  const [targetY, setTargetY] = useState(0);
  const [flyerHeight, setFlyerHeight] = useState(0);

  const style = {};

  //
  const updateFlyerPosition = function(mouseY: number) {

    if (flyerRef) {
      const { top, bottom } = flyerRef.current!.getBoundingClientRect();
    
      setFlyerHeight(bottom - top);
  
      const targetY = mouseY - flyerHeight;

      // console.log('world height: ' + worldHeight);
      // console.log('flyer height: ' + flyerHeight);
      // console.log('mouse y: ' + mouseY);
      // console.log('targetY: ' + targetY);
      const newY = Math.min(0, Math.max(targetY, flyerHeight*1.375) - worldHeight);
      //console.log('newY: ' + newY);
  
      setTargetY(newY);
      //flyerRef.current!.style.transform = `translateY(${newY}px)`;
    }
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      updateFlyerPosition(event.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [updateFlyerPosition, worldHeight]);

  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const moveFlyer = () => {
      const currentTransform = flyerRef.current?.style.transform;
      const currentYPos = currentTransform ? parseFloat(currentTransform.split(',')[1]) : 0;
      const distanceToTarget = targetY - currentYPos;
      const direction = targetY > currentYPos ? 1 : -1; // Determine direction of movement
      var rotation = 0;
      if (Math.abs(distanceToTarget) >= flyerHeight/3) {
        rotation = direction > 0 ? 20 : -20; // Set rotation based on direction
      }
      const delta = (targetY - currentYPos) * speed / 1000; // in pixels
      const nextY = currentYPos + delta;
      flyerRef.current!.style.transform = `translate(0, ${nextY}px) rotate(${rotation}deg)`;
    };

    intervalId = setInterval(moveFlyer, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetY, speed, worldHeight]);

  return (
    <div className={styles.player} style={style} ref={flyerRef}>
      <img src={cartoonAirplane} alt="Error: Player sprite missing" />
    </div>
  );
}