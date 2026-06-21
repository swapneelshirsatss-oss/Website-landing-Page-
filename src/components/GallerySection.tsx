/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ImageComponent } from './ImageComponent';
import balconyRoomImage from '../assets/images/balcony Room.avif';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
}

/**
 * Gallery Section Component
 * Displays resort images in an organized grid layout
 */
export const GallerySection: React.FC = () => {
  const galleryImages: GalleryImage[] = [
    {
      id: "balcony-room",
      src: balconyRoomImage,
      alt: "Luxury Balcony Room with Mountain Views",
      title: "Balcony Room",
      description: "Experience luxury with breathtaking mountain vistas from your private balcony"
    },
    // Add more images as needed
  ];

  return (
    <section id="gallery" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-amber-700 block mb-4">
            Visual Tour
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-950 tracking-tight leading-tight">
            Gallery
          </h2>
          <p className="text-stone-600 text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Explore the beauty and luxury of Whispering Pines through our curated collection
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden bg-stone-200">
                <ImageComponent
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-stone-200 leading-relaxed">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
