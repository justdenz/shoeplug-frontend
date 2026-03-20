import { getGoogleSheetsData } from "@/lib/googleapi";
import { IShoe } from "@/models/Product";

interface CacheEntry {
  data: { shoes: IShoe[]; brands: string[] };
  expiresAt: number;
}

const TTL_MS = 5 * 60 * 1000; // 5 minutes

// Module-level variable persists across requests within the same server process.
let cache: CacheEntry | null = null;
// In-flight deduplication: all concurrent callers share the same fetch promise.
let inflightRequest: Promise<{ shoes: IShoe[]; brands: string[] }> | null =
  null;

export async function getCachedSheetsData(): Promise<{
  shoes: IShoe[];
  brands: string[];
}> {
  const now = Date.now();
  if (cache && now < cache.expiresAt) {
    return cache.data;
  }
  if (inflightRequest) {
    return inflightRequest;
  }
  inflightRequest = getGoogleSheetsData()
    .then((data) => {
      cache = { data, expiresAt: Date.now() + TTL_MS };
      return data;
    })
    .finally(() => {
      inflightRequest = null;
    });
  return inflightRequest;
}
