import React, { useState } from "react";
import { LuX, LuUpload, LuTrash2 } from "react-icons/lu";
import { Car } from "@/types/car";

interface ImageEditorProps {
  car: Car;
  onClose: () => void;
  onSave: (carId: string, newImageArray: string[]) => Promise<void>;
}

const ImageEditor = ({ car, onClose, onSave }: ImageEditorProps) => {
  const [imageArray, setImageArray] = useState<string[]>(car.imageArray || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      
      // Validate files
      const validFiles = files.filter(file => {
        // Check file type
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not a valid image file`);
          return false;
        }
        
        // Check file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
          alert(`${file.name} is too large. Maximum size is 10MB`);
          return false;
        }
        
        return true;
      });
      
      if (validFiles.length > 0) {
        setNewImages(prev => [...prev, ...validFiles]);
      }
      
      // Reset the input
      event.target.value = '';
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(event.dataTransfer.files);
    
    // Validate files
    const validFiles = files.filter(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not a valid image file`);
        return false;
      }
      
      // Check file size (10MB limit)
      const maxSize = 4 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Maximum size is 4MB`);
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length > 0) {
      setNewImages(prev => [...prev, ...validFiles]);
    }
  };

  const removeExistingImage = (index: number) => {
    setImageArray(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsUploading(true);
    setUploadProgress('');
    
    try {
      let uploadedImageUrls: string[] = [];
      
      // Upload new images to Vercel blob storage
      if (newImages.length > 0) {
        setUploadProgress(`Uploading ${newImages.length} image(s)...`);
        
        const uploadPromises = newImages.map(async (file, index) => {
          setUploadProgress(`Uploading image ${index + 1} of ${newImages.length}...`);
          
          const formData = new FormData();
          formData.append('file', file);
          formData.append('filename', `${car._id}-${Date.now()}-${index}-${file.name}`);
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Failed to upload ${file.name}`);
          }
          
          const result = await response.json();
          if (!result.success || !result.url) {
            throw new Error(`Invalid response for ${file.name}`);
          }
          
          return result.url;
        });
        
        uploadedImageUrls = await Promise.all(uploadPromises);
        setUploadProgress('Images uploaded successfully!');
      }
      
      // Combine existing images with newly uploaded ones
      const updatedImageArray = [...imageArray, ...uploadedImageUrls];
      
      setUploadProgress('Saving changes...');
      // Save the updated image array to the car
      await onSave(car._id!, updatedImageArray);
      
      // Reset new images after successful save
      setNewImages([]);
      setUploadProgress('');
    } catch (error) {
      console.error('Error saving images:', error);
      setUploadProgress('');
      // Show error message to the user
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images';
      alert(`Error: ${errorMessage}. Please try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Images for {car.brand} {car.model}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <LuX size={24} />
          </button>
        </div>

        {/* Current Images */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Current Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageArray.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`${car.brand} ${car.model} - ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <LuTrash2 size={12} />
                </button>
              </div>
            ))}
          </div>
          {imageArray.length === 0 && (
            <p className="text-gray-500 text-center py-8">No images currently uploaded</p>
          )}
        </div>

        {/* New Images to Upload */}
        {newImages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3">New Images to Upload</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newImages.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    onClick={() => removeNewImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <LuTrash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="mb-6">
          <label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isDragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <LuUpload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
            />
          </label>
        </div>

        {/* Upload Progress */}
        {uploadProgress && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">{uploadProgress}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isUploading}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isUploading || newImages.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                Uploading...
              </div>
            ) : (
              `Save Changes${newImages.length > 0 ? ` (${newImages.length} new)` : ''}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
