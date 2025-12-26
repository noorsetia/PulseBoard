import React from 'react';
import { useSelector } from 'react-redux';

export const TaskStatsWidget = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  // Calculate statistics
  const stats = {
    total: tasks.length,
    byPriority: {
      critical: tasks.filter(t => t.priority === 'critical').length,
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length,
    },
    byStatus: {
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      done: tasks.filter(t => t.status === 'done').length,
    },
    overdue: tasks.filter(t => {
      if (!t.dueDate) return false;
      return new Date(t.dueDate) < new Date() && t.status !== 'done';
    }).length,
    dueToday: tasks.filter(t => {
      if (!t.dueDate) return false;
      const today = new Date().toDateString();
      const dueDate = new Date(t.dueDate).toDateString();
      return today === dueDate && t.status !== 'done';
    }).length,
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.byStatus.done / stats.total) * 100) 
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Task Statistics
      </h3>

      {/* Completion Rate */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
          <span className="text-lg font-bold text-green-600 dark:text-green-400">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">By Priority</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Critical</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{stats.byPriority.critical}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">High</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{stats.byPriority.high}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Medium</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{stats.byPriority.medium}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Low</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{stats.byPriority.low}</span>
          </div>
        </div>
      </div>

      {/* Important Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <span className="text-sm font-medium text-red-700 dark:text-red-400">Overdue</span>
          <span className="text-lg font-bold text-red-700 dark:text-red-400">{stats.overdue}</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Due Today</span>
          <span className="text-lg font-bold text-blue-700 dark:text-blue-400">{stats.dueToday}</span>
        </div>
      </div>
    </div>
  );
};
