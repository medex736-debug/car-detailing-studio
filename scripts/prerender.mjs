import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

/**
 * Post-build pre-render: injects the server-rendered Arabic HTML into the
 * built dist/index.html so AI crawlers (which do not run JavaScript) get the
 * real content. Runs after `vite build` and `vite build --ssr`.
 */
const indexPath = resolve("dist/index.html");
const serverEntry = resolve("dist-ssr/entry-server.js");

const template = await readFile(indexPath, "utf8");
const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

if (!template.includes('<div id="root"></div>')) {
  throw new Error("prerender: <div id=\"root\"></div> not found in dist/index.html");
}

await writeFile(
  indexPath,
  template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
  "utf8",
);

console.log(`prerender: injected ${appHtml.length} characters into dist/index.html`);
