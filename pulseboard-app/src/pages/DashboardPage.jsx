import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout } from '../components/layout/Layout';
import { selectTasksStats } from '../features/tasks/tasksSlice';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { TaskForm } from '../features/tasks/TaskForm';
import { TaskList } from '../features/tasks/TaskList';

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
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
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
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium mb-1">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-700 font-medium mb-1">In Progress</p>
                <p className="text-3xl font-bold text-indigo-900">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-900">{stats.done}</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* Recent Tasks */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Tasks</h2>
          <TaskList />
        </div>
      </div>
    </Layout>
  );
};
