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
  windowDimensions: WindowDimensions
  ) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const flyer = flyerRef.current;

    if (flyer) {
      const { top, bottom } = flyer.getBoundingClientRect();

      const flyerHeight = bottom - top;
      const { height } = windowDimensions;

      const targetY = mousePosition.y - flyerHeight;
      const newY = Math.min(Math.max(targetY, 0), height - flyerHeight);

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