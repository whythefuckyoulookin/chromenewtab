export interface SearchEngineProps {
  title: string;
  url: string;
  name: string;
}

export function search(value: string, engine: SearchEngineProps) {
  window.location.href = `${engine.url}?${new URLSearchParams({
    [engine.name]: value,
  }).toString()}`;
}
