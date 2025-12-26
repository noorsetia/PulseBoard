import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setPriorityFilter, setTagFilter } from '../tasks/tasksSlice';
import { PRIORITY_CONFIG, TASK_TAGS } from '../../utils/constants';

export const TaskSearch = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const priorityFilter = useSelector((state) => state.tasks.priorityFilter);
  const tagFilter = useSelector((state) => state.tasks.tagFilter);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Tasks
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search by title or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Priority
          </label>
          <select
            value={priorityFilter}
            onChange={(e) => dispatch(setPriorityFilter(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.icon} {config.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Tag
          </label>
          <select
            value={tagFilter}
            onChange={(e) => dispatch(setTagFilter(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tags</option>
            {TASK_TAGS.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchQuery || priorityFilter !== 'all' || tagFilter !== 'all') && (
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {searchQuery && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
              Search: "{searchQuery}"
            </span>
          )}
          {priorityFilter !== 'all' && (
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs">
              Priority: {PRIORITY_CONFIG[priorityFilter].label}
            </span>
          )}
          {tagFilter !== 'all' && (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs">
              Tag: {TASK_TAGS.find(t => t.id === tagFilter)?.label}
            </span>
          )}
          <button
            onClick={() => {
              dispatch(setSearchQuery(''));
              dispatch(setPriorityFilter('all'));
              dispatch(setTagFilter('all'));
            }}
            className="text-xs text-red-600 dark:text-red-400 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
