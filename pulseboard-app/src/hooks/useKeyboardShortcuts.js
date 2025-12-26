import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check each shortcut
      shortcuts.forEach((shortcut) => {
        const { key, ctrl, alt, shift, callback } = shortcut;
        
        const ctrlPressed = ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
        const altPressed = alt ? event.altKey : !event.altKey;
        const shiftPressed = shift ? event.shiftKey : !event.shiftKey;
        
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          ctrlPressed &&
          altPressed &&
          shiftPressed
        ) {
          event.preventDefault();
          callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};
