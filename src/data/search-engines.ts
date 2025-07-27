import type { ISearchEngine, SearchEngine } from "@/types/search-engine";

export const engines: { [key in SearchEngine]: ISearchEngine } = {
  google: {
    title: "Google",
    url: "https://www.google.com/search",
    name: "q",
  },
  yandex: {
    title: "Yandex",
    url: "https://ya.ru/search/",
    name: "text",
  },
  youtube: {
    title: "YouTube",
    name: "search_query",
    url: "https://www.youtube.com/results",
  },
};
