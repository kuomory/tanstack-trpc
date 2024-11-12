import { build } from "esbuild";
import * as path from "path";
import * as fs from "fs";
const __dirname = import.meta.dirname;

build({
  bundle: true,
  entryPoints: [path.resolve(__dirname, "src/index.ts")],
  external: fs.readdirSync("./node_modules"),
  format: "esm",
  minify: true,
  outdir: path.resolve(__dirname, "dist"),
  platform: "node",
  tsconfig: path.resolve(__dirname, "tsconfig.build.json"),
  // outExtension: { // ESM形式で出力されることを明示的にする場合
  //   '.js': '.mjs'
  // },
  // banner: { // commonjs用ライブラリをESMプロジェクトでbundleする際に生じることのある問題への対策
  //   js: 'import { createRequire } from "module"; import url from "url"; const require = createRequire(import.meta.url); const __filename = url.fileURLToPath(import.meta.url); const __dirname = url.fileURLToPath(new URL(".", import.meta.url));',
  // },
}).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
