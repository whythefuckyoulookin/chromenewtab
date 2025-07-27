import type { ISearchEngine } from "@/types/search-engine";

export function search(value: string, engine: ISearchEngine) {
  window.location.href = `${engine.url}?${new URLSearchParams({
    [engine.name]: value,
  }).toString()}`;
}
