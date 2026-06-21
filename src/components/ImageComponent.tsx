/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ImageComponentProps {
  src: string;
  alt: string;
  className?: string;
  title?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Reusable Image Component for displaying resort images
 * Supports lazy loading and custom styling
 */
export const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  className = "w-full h-auto object-cover rounded-lg",
  title,
  loading = 'lazy'
}) => {
  return (
    <figure className="flex flex-col gap-2">
      <picture>
        <source 
          srcSet={src} 
          type="image/avif"
        />
        <img
          src={src}
          alt={alt}
          title={title}
          className={className}
          loading={loading}
          decoding="async"
        />
      </picture>
      {title && (
        <figcaption className="text-sm text-stone-600 italic">
          {title}
        </figcaption>
      )}
    </figure>
  );
};

export default ImageComponent;
