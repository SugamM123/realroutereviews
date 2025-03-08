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
