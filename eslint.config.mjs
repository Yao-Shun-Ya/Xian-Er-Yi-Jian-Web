import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 受控豁免：components/ui 是 shadcn 生成的原语，允许其既有写法；
  // 其余目录保持 next/core-web-vitals + typescript 全套规则，不整体放宽。
  {
    files: ["components/ui/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 运行时数据与备份不属于源码
    "db/backups/**",
    // Python 工程 mgd/ 与本地虚拟环境不属于 JS/TS 源码
    "mgd/**",
    ".venv/**",
    "venv/**",
    "__pycache__/**",
  ]),
]);

export default eslintConfig;
