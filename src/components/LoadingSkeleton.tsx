import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'image' | 'compact';
  count?: number;
}

/**
 * Loading skeleton component for better UX during data fetch
 */
export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  variant = 'card',
  count = 1 
}) => {
  const skeletonStyle: React.CSSProperties = {
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  const renderSkeleton = () => {
    if (variant === 'card') {
      return (
        <div className="world-card" style={{ opacity: 0.6 }}>
          <div className="world-card-image" style={{ ...skeletonStyle, height: '200px' }} />
          <div className="world-card-content">
            <div style={{ ...skeletonStyle, height: '20px', marginBottom: '10px', width: '90%' }} />
            <div style={{ ...skeletonStyle, height: '16px', width: '40%' }} />
          </div>
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div className="crypto-card" style={{ opacity: 0.6 }}>
          <div className="crypto-card-content">
            <div style={{ ...skeletonStyle, height: '18px', marginBottom: '8px', width: '85%' }} />
            <div style={{ ...skeletonStyle, height: '14px', width: '30%' }} />
          </div>
        </div>
      );
    }

    if (variant === 'image') {
      return <div style={{ ...skeletonStyle, height: '100%', width: '100%' }} />;
    }

    if (variant === 'text') {
      return <div style={{ ...skeletonStyle, height: '16px', width: '100%' }} />;
    }

    return null;
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
};

export default LoadingSkeleton;
