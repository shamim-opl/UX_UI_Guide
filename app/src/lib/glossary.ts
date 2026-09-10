import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";

export type GlossaryEntry = {
  term: string;
  term_bn: string;
  definition_en: string;
  simple_explanation: string;
  example: string;
  related_terms: string[];
  category: string;
};

export function getGlossary(): GlossaryEntry[] {
  const file = path.join(process.cwd(), "src", "data", "glossary.yaml");
  const raw = fs.readFileSync(file, "utf8");
  return loadYaml(raw) as GlossaryEntry[];
}
