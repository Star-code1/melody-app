import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getStaticAssetPath = (relativePath) => {
  // Go up one directory to reach the backend root
  const backendRoot = path.resolve(__dirname, "..");

  // For production, we'll look in the frontend build directory
  if (process.env.NODE_ENV === "production") {
    // Go up from backend to project root, then to the build directory
    return path.resolve(backendRoot, "..", "dist", relativePath);
  }

  // For development, get from public directory
  return path.resolve(backendRoot, "public", relativePath);
};
