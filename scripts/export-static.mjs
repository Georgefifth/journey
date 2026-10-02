import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const result = spawnSync(process.execPath,[fileURLToPath(new URL('../node_modules/next/dist/bin/next',import.meta.url)),'build'],{stdio:'inherit',env:{...process.env,JOURNEY_STATIC_EXPORT:'1'}});
process.exit(result.status ?? 1);
