import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout } from '../components/layout/Layout';
import { selectTasksStats } from '../features/tasks/tasksSlice';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { TaskForm } from '../features/tasks/TaskForm';
import { TaskList } from '../features/tasks/TaskList';
import { ActivityTimeline } from '../features/analytics/ActivityTimeline';
import { TaskStatsWidget } from '../features/tasks/TaskStatsWidget';

export const DashboardPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const stats = useSelector(selectTasksStats);
  const user = useSelector((state) => state.auth.user);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Here's what's happening with your tasks today.
            </p>
          </div>
          <Button
            onClick={() => setShowTaskForm(!showTaskForm)}
            variant="primary"
          >
            {showTaskForm ? 'Cancel' : '+ New Task'}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-blue-700 dark:text-blue-300 font-medium mb-1">Total Tasks</p>
                <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
              </div>
              <div className="w-14 h-14 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-700 dark:text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-yellow-700 dark:text-yellow-300 font-medium mb-1">Pending</p>
                <p className="text-4xl font-bold text-yellow-900 dark:text-yellow-100">{stats.pending}</p>
              </div>
              <div className="w-14 h-14 bg-yellow-200 dark:bg-yellow-700 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-yellow-700 dark:text-yellow-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-indigo-700 dark:text-indigo-300 font-medium mb-1">In Progress</p>
                <p className="text-4xl font-bold text-indigo-900 dark:text-indigo-100">{stats.inProgress}</p>
              </div>
              <div className="w-14 h-14 bg-indigo-200 dark:bg-indigo-700 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-indigo-700 dark:text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-green-700 dark:text-green-300 font-medium mb-1">Completed</p>
                <p className="text-4xl font-bold text-green-900 dark:text-green-100">{stats.done}</p>
              </div>
              <div className="w-14 h-14 bg-green-200 dark:bg-green-700 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-green-700 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Task Form */}
        {showTaskForm && (
          <div className="animate-fadeIn">
            <TaskForm onClose={() => setShowTaskForm(false)} />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Your Tasks</h2>
            <TaskList />
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="lg:col-span-1 space-y-6">
            <TaskStatsWidget />
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </Layout>
  );
};
