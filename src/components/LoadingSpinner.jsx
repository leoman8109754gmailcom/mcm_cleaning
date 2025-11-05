/**
 * Loading Spinner Component
 *
 * Simple, accessible loading indicator for data fetching states
 */

export default function LoadingSpinner({ size = 'medium', color = '#17616E' }) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex items-center justify-center" role="status" aria-live="polite">
      <div
        className={`${sizeClasses[size]} border-gray-200 border-t-current rounded-full animate-spin`}
        style={{ borderTopColor: color }}
        aria-label="Loading"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * Loading Skeleton for text content
 */
export function LoadingSkeleton({ width = '100%', height = '1rem', className = '' }) {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
