/**
 * Build script: regenerates `public/Dao_Viet_Hoang_CV.pdf` from `lib/constants.ts`.
 *
 * Run with:  npm run build:cv
 *
 * Uses @react-pdf/renderer in pure Node (outside Next's bundler) to avoid
 * the React-instance / reconciler issues that prevent it from running
 * inside an App Router route handler.
 */

import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { CvDocument } from "../lib/cv-pdf";

async function main() {
  const out = resolve(process.cwd(), "public/Dao_Viet_Hoang_CV.pdf");
  const buf = await renderToBuffer(React.createElement(CvDocument));
  await writeFile(out, buf);
  // eslint-disable-next-line no-console
  console.log(`✓ Wrote ${out}  (${(buf.byteLength / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
