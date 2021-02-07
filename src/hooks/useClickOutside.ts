import { useEffect, useRef } from 'react';

function useClickOutside(fn: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });

  const handleClick = (e: MouseEvent): void => {
    const target = e.target as HTMLDivElement;
    if (ref.current && ref.current.contains(target)) {
      return;
    }
    fn();
  };

  return ref;
}

export default useClickOutside;
