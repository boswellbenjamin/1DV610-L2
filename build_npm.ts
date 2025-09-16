import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./person.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  test: false,
  typeCheck: false,
  package: {
    name: "person-data-generator",
    version: "0.1.2",
    description: "Generate random person data for testing and development",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/boswellbenjamin/1DV610-L2",
    },
    bugs: {
      url: "https://github.com/boswellbenjamin/1DV610-L2/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("person.json", "npm/esm/person.json");
    Deno.copyFileSync("person.json", "npm/script/person.json");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
