export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
};

export const TASK_STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    hoverColor: 'hover:bg-yellow-200 dark:hover:bg-yellow-900/50',
  },
  'in-progress': {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    hoverColor: 'hover:bg-blue-200 dark:hover:bg-blue-900/50',
  },
  done: {
    label: 'Done',
    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
    hoverColor: 'hover:bg-green-200 dark:hover:bg-green-900/50',
  },
};

export const STATUS_TRANSITIONS = {
  pending: ['in-progress', 'done'],
  'in-progress': ['pending', 'done'],
  done: ['pending', 'in-progress'],
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

export const PRIORITY_CONFIG = {
  low: {
    label: 'Low',
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    icon: '▼',
  },
  medium: {
    label: 'Medium',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    icon: '■',
  },
  high: {
    label: 'High',
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    icon: '▲',
  },
  critical: {
    label: 'Critical',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    icon: '⚠',
  },
};

export const TASK_TAGS = [
  { id: 'bug', label: 'Bug', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  { id: 'feature', label: 'Feature', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  { id: 'improvement', label: 'Improvement', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { id: 'documentation', label: 'Documentation', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  { id: 'urgent', label: 'Urgent', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
];
