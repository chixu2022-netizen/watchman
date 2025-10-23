import React from 'react';
import { useLazyLoad } from '../../hooks/useLazyLoad';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
}

const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  fallback = <div style={{ minHeight: '300px' }} />,
  threshold = 0.1 
}) => {
  const { elementRef, isVisible } = useLazyLoad({ threshold });

  return (
    <div ref={elementRef}>
      {isVisible ? children : fallback}
    </div>
  );
};

export default LazySection;
