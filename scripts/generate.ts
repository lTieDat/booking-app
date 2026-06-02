import * as dotenv from 'dotenv';
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import * as url from 'node:url';
import { generateApi } from 'swagger-typescript-api';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DEFAULT_SPEC_URL = 'http://localhost:8080/v3/api-docs';
const OUTPUT_DIR = path.resolve(ROOT_DIR, 'packages/shared/src/api/generated');
const OUTPUT_FILE_NAME = 'booking-api.ts';

dotenv.config({ path: path.resolve(ROOT_DIR, '.env') });
dotenv.config({ path: path.resolve(ROOT_DIR, '.env.local'), override: true });

function resolveSpecUrl() {
  const explicitSpecUrl = process.env.SWAGGER_SPEC_URL ?? process.env.OPENAPI_SPEC_URL;
  if (explicitSpecUrl) return explicitSpecUrl;

  const baseUrl = process.env.SWAGGER_BASE_URL;
  if (!baseUrl) return DEFAULT_SPEC_URL;

  const parsedUrl = new URL(baseUrl);

  if (parsedUrl.pathname.includes('/swagger-ui')) {
    return `${parsedUrl.origin}/v3/api-docs`;
  }

  if (parsedUrl.pathname === '/' || parsedUrl.pathname === '') {
    return `${parsedUrl.origin}/v3/api-docs`;
  }

  return parsedUrl.toString();
}

function formatGeneratedFiles(...files: string[]) {
  execFileSync('npm', ['exec', '--yes', 'prettier', '--', '--write', ...files], {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  });
}

async function fetchOpenApiSpec(specUrl: string) {
  const headers: Record<string, string> = { Accept: 'application/json' };
  const token = process.env.SWAGGER_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(specUrl, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec from ${specUrl}: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('json')) {
    throw new Error(`Expected JSON OpenAPI spec from ${specUrl}, received "${contentType || 'unknown'}"`);
  }

  return response.json();
}

async function main() {
  const specUrl = resolveSpecUrl();
  const spec = await fetchOpenApiSpec(specUrl);
  const pathCount = Object.keys((spec as { paths?: Record<string, unknown> }).paths ?? {}).length;

  if (pathCount === 0) {
    throw new Error(`OpenAPI spec from ${specUrl} does not contain any paths.`);
  }

  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'booking-openapi-'));

  try {
    await generateApi({
      spec,
      output: tmpDir,
      httpClientType: 'fetch',
      moduleNameIndex: 0,
      generateClient: true,
      generateRouteTypes: true,
      unwrapResponseData: false,
      generateUnionEnums: false,
    });

    const generatedFile = path.join(tmpDir, 'Api.ts');
    const outputFile = path.join(OUTPUT_DIR, OUTPUT_FILE_NAME);
    const indexFile = path.join(OUTPUT_DIR, 'index.ts');

    fs.renameSync(generatedFile, outputFile);
    fs.writeFileSync(indexFile, "export * from './booking-api';\n");
    formatGeneratedFiles(outputFile, indexFile);

    console.log(`Generated API client from ${specUrl}`);
    console.log(`Discovered ${pathCount} OpenAPI paths.`);
    console.log(`Output: ${path.relative(ROOT_DIR, outputFile)}`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
