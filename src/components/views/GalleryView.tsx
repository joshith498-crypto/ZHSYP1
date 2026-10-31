/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GalleryItem, PageId } from '../../types';
import { PageFlowNext } from '../PageFlowNext';
import { Image as ImageIcon, Plus, Trash2, X, ZoomIn, Camera } from 'lucide-react';

interface GalleryViewProps {
  items: GalleryItem[];
  isAdmin: boolean;
  onNavigate: (page: PageId) => void;
  onAddImage: () => void;
  onDeleteImage: (id: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  items,
  isAdmin,
  onNavigate,
  onAddImage,
  onDeleteImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="space-y-16 max-w-6xl mx-auto">
      {/* Header */}
      <section className="text-center pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#E5E0D8] bg-[#FAF8F5] text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-4">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Visual Records</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1F3D33] tracking-tight mb-4">
          Parliamentary Gallery
        </h1>

        <p className="max-w-2xl mx-auto text-base text-[#6B6B6B] leading-relaxed">
          Documenting procedural decorum, floor debates, consensus workshops, and student delegations.
        </p>

        {isAdmin && (
          <div className="mt-8">
            <button
              onClick={onAddImage}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F3D33] hover:bg-[#162c25] text-[#FAF8F5] text-sm font-medium rounded-sm transition-colors cursor-pointer"
              aria-label="Add Image to Gallery"
            >
              <Plus className="w-4 h-4 text-[#B08D57]" />
              <span>Add Image</span>
            </button>
          </div>
        )}
      </section>

      {/* Image Grid */}
      <section>
        {items.length === 0 ? (
          <div className="text-center py-16 card-subtle rounded-sm border border-[#E5E0D8]">
            <Camera className="w-8 h-8 text-[#E5E0D8] mx-auto mb-2" />
            <p className="text-sm text-[#6B6B6B]">No images uploaded to the gallery yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((img) => (
              <div
                key={img.id}
                className="card-subtle rounded-sm border border-[#E5E0D8] overflow-hidden flex flex-col justify-between group hover:border-[#1F3D33] transition-all"
              >
                <div
                  className="relative aspect-4/3 overflow-hidden bg-[#FAF8F5] cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-[#1F3D33]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 bg-[#FAF8F5] rounded-full text-[#1F3D33] shadow-md">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                  {img.category && (
                    <span className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#1F3D33]/90 text-[#FAF8F5] rounded-xs">
                      {img.category}
                    </span>
                  )}
                </div>

                <div className="p-4 flex items-start justify-between gap-2 border-t border-[#E5E0D8]">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#1F3D33] leading-snug">
                      {img.title}
                    </h3>
                    <p className="text-xs text-[#6B6B6B] mt-1 line-clamp-2">
                      {img.caption}
                    </p>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => onDeleteImage(img.id)}
                      className="p-1.5 text-[#6B6B6B] hover:text-red-700 cursor-pointer shrink-0"
                      title="Remove image from gallery"
                      aria-label={`Delete ${img.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F3D33]/80 backdrop-blur-xs"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-w-4xl w-full bg-[#FAF8F5] rounded-sm overflow-hidden border border-[#E5E0D8] p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-[#FAF8F5] text-[#1F3D33] hover:text-[#B08D57] rounded-full border border-[#E5E0D8] cursor-pointer z-10"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden rounded-xs flex items-center justify-center bg-black/5">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="pt-4 border-t border-[#E5E0D8] mt-3">
              <h3 className="font-heading text-2xl font-bold text-[#1F3D33]">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-[#6B6B6B] mt-1">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page Flow: Next link to Contact */}
      <PageFlowNext currentPage="gallery" onNavigate={onNavigate} />
    </div>
  );
};
