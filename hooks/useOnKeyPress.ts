import { useEffect } from 'react';

// taken and modified from https://usehooks.com/useKeyPress/
const useOnKeyPress = (
  targetKeys: string | string[],
  handler: (event: Event) => any,
  shiftKey?: boolean
): void => {
  useEffect(() => {
    if (typeof targetKeys === 'string') {
      targetKeys = [targetKeys];
    }

    const listener = (event: KeyboardEvent) => {
      if (
        targetKeys.includes(event.key) &&
        (shiftKey === undefined ||
          (shiftKey ? event.shiftKey : !event.shiftKey))
      ) {
        handler(event);
      }
    };

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [targetKeys, handler]);
};

export default useOnKeyPress;
