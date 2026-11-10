// Compiles one Sass file with only the given load path and prints the CSS.
// Run as a child process by sass-consumer.spec.ts so test-coverage instrumentation
// (which slows the pure-JS Sass compiler ~3.5x) doesn't apply to it.
import * as sass from "sass";

const [file, loadPath] = process.argv.slice(2);
process.stdout.write(
  sass.compile(file, { loadPaths: [loadPath], quietDeps: true, logger: sass.Logger.silent }).css,
);
