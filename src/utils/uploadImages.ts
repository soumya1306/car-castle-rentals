import { getAuthHeaders } from "@/utils/auth";

/**
 * Uploads multiple images to Vercel Blob storage
 * @param files - Array of File objects to upload
 * @param onProgress - Optional callback to track upload progress
 * @returns Promise<string[]> - Array of uploaded image URLs
 */
export async function uploadImagesToVercelBlob(
  id: string,
  files: File[],
  onProgress?: (progress: { completed: number; total: number; currentFile: string }) => void
): Promise<string[]> {
  if (files.length === 0) {
    return [];
  }

  try {
    const uploadPromises = files.map(async ( file, index) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', `${id}-${Date.now()}-${index}-${file.name}`);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to upload ${file.name}: ${errorData.error || response.statusText}`);
      }

      const result = await response.json();
      
      // Call progress callback if provided
      if (onProgress) {
        onProgress({
          completed: index + 1,
          total: files.length,
          currentFile: file.name
        });
      }

      return result.url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw new Error(`Failed to upload images: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Uploads a single image to Vercel Blob storage
 * @param id - Car ID to use in the filename
 * @param file - File object to upload
 * @returns Promise<string> - Uploaded image URL
 */
export async function uploadSingleImageToVercelBlob(
  id: string,
  file: File
): Promise<string> {
  const urls = await uploadImagesToVercelBlob(id, [file]);
  return urls[0];
}

/**
 * Deletes images from Vercel Blob storage
 * @param imageUrls - Array of image URLs to delete
 * @returns Promise<void>
 */
export async function deleteImagesFromVercelBlob(imageUrls: string[]): Promise<void> {
  if (imageUrls.length === 0) {
    return;
  }

  try {
    const deletePromises = imageUrls.map(async (imageUrl) => {
      if (!imageUrl || !imageUrl.trim()) {
        return;
      }

      const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`Failed to delete image ${imageUrl}: ${errorData.error || response.statusText}`);
        // Don't throw error for individual image deletion failures
        // This allows the car deletion to continue even if some images fail to delete
      }
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting images:', error);
    // Don't throw error - allow car deletion to continue
    console.warn('Some images may not have been deleted, but continuing with car deletion');
  }
}