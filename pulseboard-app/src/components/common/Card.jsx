export const Card = ({ children, className = '', padding = true, hover = false }) => {
  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';
  const paddingClass = padding ? 'p-6' : '';

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 ${paddingClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};
