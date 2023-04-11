import { RefObject, useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface WindowDimensions {
  width: number;
  height: number;
}


const useUpdateFlyerPosition = (
  flyerRef: RefObject<HTMLDivElement>,
  worldHeight: number
  ) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const flyer = flyerRef.current;
    if (flyer) {
      const { top, bottom } = flyer.getBoundingClientRect();

      const flyerHeight = bottom - top;

      const targetY = mousePosition.y - flyerHeight;
/*       console.log('world height: ' + worldHeight);
      console.log('flyer height: ' + flyerHeight);
      console.log('mouse y: ' + mousePosition.y);
      console.log('targetY: ' + targetY); */
      const newY = Math.min(0, Math.max(targetY, flyerHeight*1.375) - worldHeight);
      //console.log('newY: ' + newY);

      flyer.style.transform = `translateY(${newY}px)`;
    }
  }, [flyerRef, mousePosition]);

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return handleMouseMove;
};

export default useUpdateFlyerPosition;