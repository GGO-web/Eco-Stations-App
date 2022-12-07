import { useEffect, useState } from 'react';

export function useMediaCondition(condition: string) {
  const [windowMediaStatus, setWindowMediaStatus] = useState(false);

  useEffect(() => {
    function updateSize() {
      const state = window.matchMedia(condition).matches;

      setWindowMediaStatus(state);
    }

    window.addEventListener('resize', updateSize);

    updateSize();

    // return () => window.removeEventListener('resize', updateSize);
  }, []);

  return windowMediaStatus;
}
