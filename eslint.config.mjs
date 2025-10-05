import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",    // Node.js built-in modules
            "external",   // External packages
            "internal",   // Internal modules using @ alias
            ["parent", "sibling"],  // Parent and sibling imports
            "index",     // Index imports
            "object",    // Object imports
            "type"      // Type imports
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before"
            },
            {
              pattern: "next/**",
              group: "builtin",
              position: "before"
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after"
            }
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ]
    }
  }
];

export default eslintConfig;
