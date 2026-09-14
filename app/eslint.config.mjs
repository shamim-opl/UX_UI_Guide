import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // .vercel/output is `vercel build`'s generated deploy artifact (minified
    // bundles, launcher shims) — gitignored already, but a local `vercel
    // build`/`vercel deploy` run leaves it on disk and it otherwise gets
    // swept into `eslint .` along with real source. Added 2026-09-15 after
    // it surfaced ~1900 warnings from bundled/minified code that isn't ours.
    ".vercel/**",
  ]),
]);

export default eslintConfig;
