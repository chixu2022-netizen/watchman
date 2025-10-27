import React, { useState, useEffect, useRef } from 'react';
import { NEWS_IMAGE_PLACEHOLDER } from '../constants/images';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackSrc?: string;
}

/**
 * Lazy loading image component with intersection observer
 * Only loads images when they're about to enter the viewport
 */
export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '',
  style = {},
  fallbackSrc = NEWS_IMAGE_PLACEHOLDER
}) => {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Image is in viewport, load it
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setImageSrc(fallbackSrc);
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.5,
        transition: 'opacity 0.3s ease-in-out',
      }}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy" // Native browser lazy loading as fallback
    />
  );
};

export default LazyImage;
