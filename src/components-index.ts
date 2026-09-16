import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const componentsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "components");

export function listComponentIds(): string[] {
  return readdirSync(componentsDir)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.replace(/\.tsx$/, ""))
    .sort();
}

export function getComponentById(id: string): string {
  const safe = id.replace(/[^a-z0-9-]/gi, "");
  if (!safe || safe !== id) {
    throw new Error(`unknown component id: ${id}`);
  }
  return readFileSync(join(componentsDir, `${safe}.tsx`), "utf8");
}

export function getAllComponents(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const id of listComponentIds()) {
    out[id] = getComponentById(id);
  }
  return out;
}
