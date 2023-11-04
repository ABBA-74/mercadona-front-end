import { useEffect, useState } from 'react';

/**
 * Custom hook that accepts a maximum width as a parameter and returns a boolean
 * @param {Nummber} maxWidth
 * @returns {Boolean} return true if width exceeded maxWidth
 */
function useWidthCheck(maxWidth) {
  const [isWidthExceeded, setIsWidthExceeded] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsWidthExceeded(window.innerWidth > maxWidth);
    };

    checkSize();

    window.addEventListener('resize', checkSize);

    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [maxWidth]);

  return isWidthExceeded;
}

export default useWidthCheck;
