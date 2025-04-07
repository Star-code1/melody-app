import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// For ES modules compatibility with __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = process.argv[2] || "."; // Default to current directory
const localUrl = "https://melody-t9y4.onrender.com/";
const productionUrl = "https://melody-t9y4.onrender.com/";

// File extensions to search
const extensions = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".html",
  ".css",
  ".json",
  ".md",
];

function replaceInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    if (content.includes(localUrl)) {
      const newContent = content.replace(
        new RegExp(localUrl.replace(/\//g, "\\/"), "g"),
        productionUrl
      );
      fs.writeFileSync(filePath, newContent, "utf8");
      console.log(`Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function walkDirectory(dir) {
  let replacementCount = 0;

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== "node_modules" && file !== ".git") {
      replacementCount += walkDirectory(filePath);
    } else if (stat.isFile() && extensions.includes(path.extname(filePath))) {
      if (replaceInFile(filePath)) {
        replacementCount++;
      }
    }
  });

  return replacementCount;
}

console.log(`Replacing "${localUrl}" with "${productionUrl}" in all files...`);
const replacementCount = walkDirectory(directoryPath);
console.log(`Completed! Replaced URLs in ${replacementCount} files.`);
