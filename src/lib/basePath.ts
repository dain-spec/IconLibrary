// Set only for the GitHub Pages build (served from /IconLibrary); empty on Vercel/local.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(publicPath: string): string {
  return publicPath.startsWith("/") ? `${BASE_PATH}${publicPath}` : publicPath;
}
