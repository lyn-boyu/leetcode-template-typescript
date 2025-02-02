import { join } from 'path';
import { logger } from '../utils/logger';

/**
 * Transpile a single file
 */
async function transpileFile(srcPath: string, destPath: string): Promise<void> {
  try {
    await Bun.build({
      entrypoints: [srcPath],
      outfile: destPath,
      external: ["bun:test"], // Don't bundle bun:test module
      target: "bun",
      format: "esm",
    });
    logger.success(`Transpiled: ${srcPath} -> ${destPath}`);
  } catch (error) {
    throw new Error(`Failed to transpile ${srcPath}: ${error}`);
  }
}

/**
 * Transpile all necessary files
 */
export async function transpileFiles(problemDir: string): Promise<void> {
  const files = [
    {
      src: join(problemDir, 'index.ts'),
      dest: join(problemDir, 'index.js')
    },
    {
      src: join(problemDir, 'index.test.ts'),
      dest: join(problemDir, 'index.test.js')
    },
    {
      src: join(problemDir, '.meta', 'solution.ts'),
      dest: join(problemDir, '.meta', 'solution.js')
    }
  ];

  try {
    await Promise.all(files.map(({ src, dest }) => transpileFile(src, dest)));
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Transpilation failed:', error.message);
    }
    throw error;
  }
}