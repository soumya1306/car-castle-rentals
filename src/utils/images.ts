// Function to fetch all car images
export async function getCarImages(prefix?: string) {
  try {
    const params = new URLSearchParams();
    if (prefix) {
      params.append('prefix', prefix);
    }

    const response = await fetch(`/api/images?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch images');
    }

    return data.images;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

// Function to get metadata for a specific image
export async function getImageMetadata(url: string) {
  try {
    const params = new URLSearchParams({ url });
    const response = await fetch(`/api/images?${params}`, {
      method: 'HEAD',
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch image metadata');
    }

    return data;
  } catch (error) {
    console.error('Error fetching image metadata:', error);
    return null;
  }
}