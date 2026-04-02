import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // ✅ SORT IMPORTS
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. React + Next
            ["^react", "^next"],

            // 2. NPM packages
            ["^@?\\w"],

            // 3. Aliases (@/)
            ["^@/components", "^@/stores", "^@/hooks", "^@/utils", "^@/lib", "^@/types"],

            // 4. Ostali @/ (fallback)
            ["^@/"],

            // 5. Relative imports
            ["^\\."],

            // 6. Styles
            ["\\.scss$", "\\.css$"],
          ],
        },
      ],

      // SORT EXPORTS
      "simple-import-sort/exports": "error",
    },
  },

  // Override ignores
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
