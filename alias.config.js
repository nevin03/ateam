import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Alias helper
const resolve = (dir) => path.resolve(__dirname, "src", dir);

export const alias = {
  "@": resolve(""),
  "@components": resolve("components/shared"),
  "@test": resolve("components/Test"),
  "@formik": resolve("components/shared/Formik"),
  "@contexts": resolve("contexts"),
  "@utils": resolve("utils"),
  "@hooks": resolve("hooks"),
  "@assets": resolve("assets"),
};
