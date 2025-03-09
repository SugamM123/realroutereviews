import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const normalizeRouteId = (id) => {
  if (id.includes('-')) {
    // Split the ID by the hyphen
    const parts = id.split('-');
    // Pad both parts with leading zeros if they are single digits
    const normalizedFirstPart = parts[0].padStart(2, '0');
    const normalizedSecondPart = parts[1].padStart(2, '0');
    // Return the formatted ID
    return `${normalizedFirstPart}-${normalizedSecondPart}`;
  }
  // Pad single-digit numbers with a leading zero
  return id.padStart(2, '0');
};

// Normalize route ID for display
export function normalizeRouteIdForDisplay(id) {
  // If the ID is already a number or number-like string (e.g., "01"), return it
  if (/^\d+(-\d+)?$/.test(id)) {
    return `Route ${id}`;
  }
  // Otherwise, it's likely a name, so return empty string
  return '';
}

// Find route ID by name
export async function findRouteIdByName(name, getRoutes) {
  try {
    const routes = await getRoutes();
    const route = routes.find(r => r.name.toLowerCase() === name.toLowerCase());
    return route ? route.id : null;
  } catch (error) {
    console.error('Error finding route by name:', error);
    return null;
  }
}
