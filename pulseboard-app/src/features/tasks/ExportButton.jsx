import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredTasks } from './tasksSlice';
import Button from '../../components/common/Button';

const ExportButton = () => {
  const filteredTasks = useSelector(selectFilteredTasks);

  const exportToJSON = () => {
    const dataStr = JSON.stringify(filteredTasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `pulseboard-tasks-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const exportToCSV = () => {
    const csvHeaders = ['ID', 'Title', 'Description', 'Status', 'Priority', 'Due Date', 'Tags', 'Created At'];
    
    const csvRows = filteredTasks.map(task => [
      task.id,
      `"${task.title.replace(/"/g, '""')}"`,
      `"${task.description.replace(/"/g, '""')}"`,
      task.status,
      task.priority || 'N/A',
      task.dueDate || 'N/A',
      `"${(task.tags || []).join(', ')}"`,
      new Date(task.createdAt).toLocaleString()
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');

    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    const exportFileDefaultName = `pulseboard-tasks-${new Date().toISOString().split('T')[0]}.csv`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={exportToJSON}
        className="dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600"
      >
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export JSON
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportToCSV}
        className="dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600"
      >
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export CSV
      </Button>
    </div>
  );
};

export default ExportButton;
