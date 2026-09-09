export {};

declare global {
  interface Window {
    __setFavicon?: (theme: "light" | "dark") => void;
  }
}
