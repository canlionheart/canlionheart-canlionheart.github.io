import { RefObject, useEffect, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

const useUpdateFlyerPosition = (flyerRef: RefObject<HTMLDivElement>) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const flyer = flyerRef.current;

    if (flyer) {
      const { top, bottom } = flyer.getBoundingClientRect();

      const flyerHeight = bottom - top;

      const targetY = mousePosition.y - flyerHeight;
      const newY = targetY > 0 ? targetY : 0;

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