import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ICONS_DIR = join(__dirname, '../icons');
const OUTPUT = join(__dirname, '../icon-register.ts');
const OUTPUT_TYPES = join(__dirname, '../icon-names.ts');

const files = readdirSync(ICONS_DIR).filter(f => f.endsWith('.svg'));

const entries = files.map(file => {
  const name = file.replace('.svg', '');
  const content = readFileSync(join(ICONS_DIR, file), 'utf-8')
    .replace(/\r?\n/g, '')
    .replace(/fill="[^"]*"/g, 'fill="none"')
    .replace(/\swidth="[^"]*"/g, '')
    .replace(/\sheight="[^"]*"/g, '');
  return `  registry.register('${ name }', \`${ content }\`);`;
});

const content = `/* AUTO-GENERATED FILE — DO NOT EDIT */
import { IconRegistry } from './icon-registry.service';

export function registerAllIcons(registry: IconRegistry) {
${ entries.join('\n') }
}
`;

writeFileSync(OUTPUT, content, 'utf-8');
console.log(`✔ icon-register.ts updated with ${ files.length } icons`);


// Générer icon-names.ts avec constante + type
const iconNames = files.map(f => f.replace('.svg', ''));

const typeContent = `/* AUTO-GENERATED FILE — DO NOT EDIT */

export const ICON_NAMES = [${iconNames.map(n => `'${n}'`).join(', ')}] as const;

export type IconName = (typeof ICON_NAMES)[number];
`;

writeFileSync(OUTPUT_TYPES, typeContent, 'utf-8');
console.log(`✔ Generated ${ files.length } icons, constant ICON_NAMES and type IconName`);
