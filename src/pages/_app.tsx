import "@/styles/globals.css"; // Global CSS
import type { AppProps } from "next/app"; // Next.js AppProps türü

export default function App({ Component, pageProps }: AppProps) {
  return (
        <Component {...pageProps} />
  );
}
