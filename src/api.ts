// Lightweight API shim kept for compatibility with older imports.
// The project primarily uses `src/apiClient.ts` for news fetching.

export async function fetchPosts(): Promise<any[]> {
  return [];
}

// intentionally no default export to avoid conflicts
