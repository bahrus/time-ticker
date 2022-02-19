import { CustomElementManifestGenerator } from 'may-it-be/doc.js';
import { resolve } from "path";
const cemg = new CustomElementManifestGenerator(resolve("types.d.ts"), 'Package', console.log);
// import { resolve } from "path";
// import * as TJS from "typescript-json-schema";
// // optionally pass argument to schema generator
// const settings: TJS.PartialArgs = {
//     required: true,
// };
// // optionally pass ts compiler options
// const compilerOptions: TJS.CompilerOptions = {
//     strictNullChecks: true,
// };
// // optionally pass a base path
// const basePath = "./";
// const program = TJS.getProgramFromFiles(
//   [resolve("types.d.ts")],
//   compilerOptions,
//   basePath
// );
// // We can either get the schema for one file and one type...
// const schema = TJS.generateSchema(program, "TimeTickerInfo", settings);
// // // ... or a generator that lets us incrementally get more schemas
// // const generator = TJS.buildGenerator(program, settings);
// // // generator can be also reused to speed up generating the schema if usecase allows:
// // const schemaWithReusedGenerator = TJS.generateSchema(program, "MyType", settings, [], generator);
// // // all symbols
// // const symbols = generator.getUserSymbols();
// console.log(JSON.stringify(schema, null, 2));
