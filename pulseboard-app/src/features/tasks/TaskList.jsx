import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredTasks, setFilter } from './tasksSlice';
import { TaskCard } from './TaskCard';
import { TaskSearch } from './TaskSearch';
import ExportButton from './ExportButton';

export const TaskList = () => {
  const tasks = useSelector(selectFilteredTasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();

  const filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  return (
    <div>
      {/* Search, Filters and Export */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <TaskSearch />
          <ExportButton />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => dispatch(setFilter(f.value))}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                filter === f.value
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' 
              ? 'Get started by creating a new task.'
              : `No ${filter} tasks found.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};
