import { del } from '@vercel/blob';

export async function uploadImage(file: File, filename: string): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to upload image');
    }

    return data.url;
  } catch (error) {
    throw new Error('Failed to upload image' + (error instanceof Error ? `: ${error.message}` : ''));
  }
}

export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    throw new Error('Failed to delete image' + (error instanceof Error ? `: ${error.message}` : ''));
  }
}