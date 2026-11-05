/**
 * Utility functions
 */

// Generates unique name for a web component
export function generateName(type: string, name: string | undefined | null): string {
  return name ||`${type}-${String(Math.random()).slice(2, -1)}`;
}
