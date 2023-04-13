import { useEffect, useRef, useState } from 'react';
import cartoonAirplane from './cartoonAirplane.png';
import styles from './Flyer.module.scss';

interface FlyerProps {
    worldHeight: number;
  }

export default function Flyer({ worldHeight }: FlyerProps) {
  const speed = 16;
  const flyerRef = useRef<HTMLDivElement>(null);
  const [currentY, setCurrentY] = useState(0);

  //
  const updateFlyerPosition = function(mouseY: number) {

    if (flyerRef) {
      const { top, bottom } = flyerRef.current!.getBoundingClientRect();
    
      const flyerHeight = bottom - top;
  
      const targetY = mouseY - flyerHeight;
      console.log('world height: ' + worldHeight);
        
      console.log('flyer height: ' + flyerHeight);
      console.log('mouse y: ' + mouseY);
      console.log('targetY: ' + targetY);
      const newY = Math.min(0, Math.max(targetY, flyerHeight*1.375) - worldHeight);
      //console.log('newY: ' + newY);
  
      flyerRef.current!.style.transform = `translateY(${newY}px)`;
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

  /*
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
*/

  const style = {};

  return (
    <div className={styles.player} style={style} ref={flyerRef}>
      <img src={cartoonAirplane} alt="Error: Player sprite missing" />
    </div>
  );
}