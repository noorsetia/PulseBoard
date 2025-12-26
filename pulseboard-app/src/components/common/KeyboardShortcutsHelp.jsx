import React, { useState } from 'react';

export const KeyboardShortcutsHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: ['Ctrl', 'N'], description: 'Create new task' },
    { keys: ['Ctrl', 'F'], description: 'Focus search' },
    { keys: ['Ctrl', 'K'], description: 'Toggle shortcuts help' },
    { keys: ['Ctrl', '1'], description: 'View All Tasks' },
    { keys: ['Ctrl', '2'], description: 'View Pending Tasks' },
    { keys: ['Ctrl', '3'], description: 'View In Progress Tasks' },
    { keys: ['Ctrl', '4'], description: 'View Done Tasks' },
    { keys: ['Escape'], description: 'Close modals/Clear search' },
    { keys: ['Ctrl', 'D'], description: 'Toggle dark mode' },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Keyboard Shortcuts (Ctrl+K)"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Keyboard Shortcuts
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-gray-700 dark:text-gray-300">{shortcut.description}</span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, keyIndex) => (
                    <React.Fragment key={keyIndex}>
                      <kbd className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded shadow-sm text-sm font-mono text-gray-800 dark:text-gray-200">
                        {key}
                      </kbd>
                      {keyIndex < shortcut.keys.length - 1 && (
                        <span className="text-gray-500 dark:text-gray-400 px-1">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 <strong>Tip:</strong> Press <kbd className="px-2 py-1 bg-white dark:bg-blue-800 rounded text-xs">Ctrl+K</kbd> anytime to toggle this help panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
