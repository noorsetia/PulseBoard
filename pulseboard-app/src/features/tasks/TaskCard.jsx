import { useDispatch } from 'react-redux';
import { updateTaskStatus, deleteTask } from './tasksSlice';
import { Card } from '../../components/common/Card';
import { TASK_STATUS_CONFIG, STATUS_TRANSITIONS, PRIORITY_CONFIG, TASK_TAGS } from '../../utils/constants';

export const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const statusConfig = TASK_STATUS_CONFIG[task.status];
  const availableTransitions = STATUS_TRANSITIONS[task.status];
  const priorityConfig = PRIORITY_CONFIG[task.priority || 'medium'];

  const handleStatusChange = (newStatus) => {
    dispatch(updateTaskStatus({ id: task.id, status: newStatus }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && task.status !== 'done';
  };

  const dueDateColor = (dueDate) => {
    if (!dueDate) return '';
    if (task.status === 'done') return 'text-gray-500 dark:text-gray-400';
    if (isOverdue(dueDate)) return 'text-red-600 dark:text-red-400 font-semibold';
    const daysUntil = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntil <= 3) return 'text-orange-600 dark:text-orange-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <Card hover className="border-l-4 dark:border-l-4" style={{ borderLeftColor: statusConfig.color.includes('yellow') ? '#f59e0b' : statusConfig.color.includes('blue') ? '#3b82f6' : '#10b981' }}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityConfig.color}`}>
              {priorityConfig.icon} {priorityConfig.label}
            </span>
          </div>
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {task.tags.map(tagId => {
                const tag = TASK_TAGS.find(t => t.id === tagId);
                return tag ? (
                  <span key={tagId} className={`px-2 py-0.5 rounded-full text-xs ${tag.color}`}>
                    {tag.label}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {task.description && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>
      )}

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(task.createdAt)}
          </span>
          {task.dueDate && (
            <span className={`text-xs flex items-center gap-1 ${dueDateColor(task.dueDate)}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Due: {new Date(task.dueDate).toLocaleDateString()}
              {isOverdue(task.dueDate) && ' (Overdue)'}
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          {availableTransitions.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${TASK_STATUS_CONFIG[status].color} ${TASK_STATUS_CONFIG[status].hoverColor}`}
              title={`Move to ${TASK_STATUS_CONFIG[status].label}`}
            >
              {TASK_STATUS_CONFIG[status].label}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};
