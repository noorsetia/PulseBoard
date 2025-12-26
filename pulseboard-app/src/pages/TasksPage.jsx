import { Layout } from '../components/layout/Layout';
import { TaskList } from '../features/tasks/TaskList';
import { TaskForm } from '../features/tasks/TaskForm';

export const TasksPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h1>
          <p className="text-gray-600">
            Create, update, and organize your tasks efficiently.
          </p>
        </div>

        <TaskForm />

        <div className="mt-8">
          <TaskList />
        </div>
      </div>
    </Layout>
  );
};
