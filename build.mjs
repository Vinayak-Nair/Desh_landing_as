import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const source = await readFile(resolve(root, "index.html"), "utf8");
const worker = `const html = ${JSON.stringify(source)};

export default {
  async fetch() {
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "no-store",
      },
    });
  },
};
`;

await mkdir(resolve(root, "dist", "server"), { recursive: true });
await writeFile(resolve(root, "dist", "server", "index.js"), worker);
await writeFile(resolve(root, "dist", "index.html"), source);
