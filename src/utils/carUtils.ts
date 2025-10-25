import { Car } from "@/types/car";
import { getAuthHeaders } from "@/utils/auth";

/**
 * Custom function to update car data via API
 * 
 * @param carData - The car object with _id and fields to update
 * @returns Promise with the updated car data or error
 * 
 * @example
 * // Update car availability
 * const result = await updateCarData({
 *   _id: "car_id_here",
 *   isAvailable: false,
 *   pricePerDay: 85
 * });
 * 
 * @example
 * // Update multiple fields
 * const result = await updateCarData({
 *   _id: "car_id_here",
 *   brand: "Updated Toyota",
 *   model: "Camry 2024",
 *   description: "Updated description"
 * });
 */
export async function updateCarData(carData: Partial<Car> & { _id: string }) {
  try {
    const response = await fetch('/api/cars', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(carData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update car');
    }

    return {
      success: true,
      message: result.message,
      car: result.car
    };
  } catch (error) {
    console.error('Error updating car:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Custom function to create a new car via API
 * 
 * @param carData - The complete car object to create (without _id, MongoDB will generate it)
 * @returns Promise with the created car data or error
 */
export async function createCarData(carData: Omit<Car, '_id'>) { 
  try {
    // Remove any _id field if present (MongoDB will generate a new one)
    const { _id, ...carDataWithoutId } = carData as Omit<Car, '_id'> & { _id?: string };
    
    const response = await fetch('/api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(carDataWithoutId)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create car');
    }

    return {
      success: true,
      message: result.message,
      car: result.car
    };
  } catch (error) {
    console.error('Error creating car:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Custom function to delete a car via API
 * 
 * @param carId - The ID of the car to delete
 * @returns Promise with success status or error
 */
export async function deleteCarData(carId: string) {
  try {
    const response = await fetch(`/api/cars?_id=${carId}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete car');
    }

    return {
      success: true,
      message: result.message,
      deletedCar: result.deletedCar
    };
  } catch (error) {
    console.error('Error deleting car:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Custom function to fetch cars with filters
 * 
 * @param filters - Optional filters for fetching cars
 * @returns Promise with cars array or error
 */
export async function fetchCarsData(filters?: {
  brand?: string;
  category?: string;
  type?: string;
  isAvailable?: boolean;
  _id?: string;
}) {
  try {
    const searchParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const url = `/api/cars${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const response = await fetch(url);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch cars');
    }

    return {
      success: true,
      cars: result.cars
    };
  } catch (error) {
    console.error('Error fetching cars:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      cars: []
    };
  }
}

/**
 * Bulk update multiple cars at once
 * 
 * @param updates - Array of car updates with _id and fields to update
 * @returns Promise with results for each update
 */
export async function bulkUpdateCars(updates: Array<Partial<Car> & { _id: string }>) {
  const results = await Promise.allSettled(
    updates.map(update => updateCarData(update))
  );

  return results.map((result, index) => ({
    carId: updates[index]._id,
    success: result.status === 'fulfilled' && result.value.success,
    data: result.status === 'fulfilled' ? result.value : null,
    error: result.status === 'rejected' ? result.reason : 
           result.status === 'fulfilled' && !result.value.success ? result.value.error : null
  }));
}

/**
 * Toggle car availability
 * 
 * @param carId - The ID of the car
 * @param isAvailable - New availability status
 * @returns Promise with the updated car data or error
 */
export async function toggleCarAvailability(carId: string, isAvailable: boolean) {
  return updateCarData({
    _id: carId,
    isAvailable
  });
}

/**
 * Update car pricing
 * 
 * @param carId - The ID of the car
 * @param pricePerDay - New price per day
 * @returns Promise with the updated car data or error
 */
export async function updateCarPricing(carId: string, pricePerDay: number) {
  return updateCarData({
    _id: carId,
    pricePerDay
  });
}