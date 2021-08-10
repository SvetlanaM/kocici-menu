import { MutableRefObject, useEffect } from 'react';

/**
 * This hook allows you to detect clicks outside of a specified element.
 *
 * Taken and modified from https://usehooks.com/useOnClickOutside/.
 *
 * @param ignoreRefs A list of node refs (referencing nodes outside the node referenced by the ref parameter)
 * which will not trigger a handler function execution if clicked.
 */
const useOnClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: Event) => any,
  ignoreRefs: Array<MutableRefObject<HTMLElement | null>> = []
): void => {
  useEffect(() => {
    const listener: EventListener = (event: Event) => {
      // Node `ref.current` may be conditionally rendered, this handles the case
      // when it is not rendered.
      if (!ref.current) {
        return;
      }

      // Do nothing if clicking ref's element or descendent elements
      if (ref.current.contains(event.target as Node)) {
        return;
      }

      // Do nothing if clicking ignored elements
      if (
        ignoreRefs.some((ref) => ref.current?.contains(event.target as Node))
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
