import { CustomElementManifestGenerator } from 'may-it-be/doc.js';
import { readFileSync } from 'fs';

const schema = readFileSync('./schema.json', 'utf8');
const cemg = new CustomElementManifestGenerator(schema, console.log);