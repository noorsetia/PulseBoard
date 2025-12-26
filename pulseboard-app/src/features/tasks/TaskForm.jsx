import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from './tasksSlice';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { TASK_PRIORITY, PRIORITY_CONFIG, TASK_TAGS } from '../../utils/constants';

export const TaskForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({ 
        title, 
        description, 
        priority,
        dueDate: dueDate || null,
        tags: selectedTags,
      }));
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setSelectedTags([]);
      if (onClose) onClose();
    }
  };

  const toggleTag = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <Card>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create New Task</h3>
      <form onSubmit={handleSubmit}>
        <Input
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          required
        />

        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task..."
          rows={3}
        />

        {/* Priority Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priority
          </label>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPriority(key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  priority === key
                    ? config.color + ' ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {config.icon} {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {TASK_TAGS.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedTags.includes(tag.id)
                    ? tag.color + ' ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button type="submit" variant="primary">
            Create Task
          </Button>
          {onClose && (
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
