import { createSlice } from '@reduxjs/toolkit';

const initialTasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : [];

const initialState = {
  tasks: initialTasks,
  filter: 'all', // all, pending, in-progress, done
  searchQuery: '',
  priorityFilter: 'all',
  tagFilter: 'all',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        status: 'pending',
        priority: action.payload.priority || 'medium',
        dueDate: action.payload.dueDate || null,
        tags: action.payload.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.tasks.unshift(newTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTaskStatus: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        task.updatedAt = new Date().toISOString();
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    updateTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title || task.title;
        task.description = action.payload.description || task.description;
        task.priority = action.payload.priority || task.priority;
        task.dueDate = action.payload.dueDate !== undefined ? action.payload.dueDate : task.dueDate;
        task.tags = action.payload.tags || task.tags;
        task.updatedAt = new Date().toISOString();
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    setTagFilter: (state, action) => {
      state.tagFilter = action.payload;
    },
  },
});

export const { addTask, updateTaskStatus, updateTask, deleteTask, setFilter, setSearchQuery, setPriorityFilter, setTagFilter } = tasksSlice.actions;

// Selectors
export const selectAllTasks = (state) => state.tasks.tasks;
export const selectTasksByStatus = (status) => (state) => 
  state.tasks.tasks.filter(task => task.status === status);
export const selectFilteredTasks = (state) => {
  let filtered = state.tasks.tasks;

  // Filter by status
  if (state.tasks.filter !== 'all') {
    filtered = filtered.filter(task => task.status === state.tasks.filter);
  }

  // Filter by search query
  if (state.tasks.searchQuery) {
    const query = state.tasks.searchQuery.toLowerCase();
    filtered = filtered.filter(task => 
      task.title.toLowerCase().includes(query) || 
      (task.description && task.description.toLowerCase().includes(query))
    );
  }

  // Filter by priority
  if (state.tasks.priorityFilter !== 'all') {
    filtered = filtered.filter(task => task.priority === state.tasks.priorityFilter);
  }

  // Filter by tag
  if (state.tasks.tagFilter !== 'all') {
    filtered = filtered.filter(task => task.tags && task.tags.includes(state.tasks.tagFilter));
  }

  return filtered;
};
export const selectTasksStats = (state) => {
  const tasks = state.tasks.tasks;
  return {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };
};

export default tasksSlice.reducer;
