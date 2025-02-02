import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { logger } from '../utils/logger';
import { access, readFile, writeFile } from 'fs/promises';

const execAsync = promisify(exec);

/**
 * Check if a file exists
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Run test cases
 * @param problemDir Problem directory path
 * @returns Whether all tests passed
 */
export async function runTests(problemDir: string): Promise<boolean> {
  const testFile = join(problemDir, 'index.test.ts');
  const solutionFile = join(problemDir, '.meta', 'solution.ts');
  const templateFile = join(problemDir, 'index.ts');

  // Check if required files exist
  if (!await fileExists(testFile)) {
    throw new Error(`Test file not found: ${testFile}`);
  }

  if (!await fileExists(solutionFile)) {
    throw new Error(`Solution file not found: ${solutionFile}`);
  }

  if (!await fileExists(templateFile)) {
    throw new Error(`Template file not found: ${templateFile}`);
  }

  // Save original template content
  let originalContent: string;
  try {
    originalContent = await readFile(templateFile, 'utf-8');
  } catch (error) {
    logger.error('Failed to read template file:', error);
    return false;
  }

  try {
    // Read and replace with actual solution
    const solutionContent = await readFile(solutionFile, 'utf-8');
    await writeFile(templateFile, solutionContent, 'utf-8');

    // Run tests
    const { stdout, stderr } = await execAsync(`bun test ${testFile}`);

    // Log test output
    logger.info(stdout);

    // Parse test results
    const failCount = (stdout.match(/(\d+) fail/) || [])[1];
    const hasFailures = failCount && parseInt(failCount) > 0;

    if (hasFailures) {
      logger.error('Some tests failed');
      return false;
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Test execution failed:', error.message);
    } else {
      logger.error('Test execution failed with unknown error:', error);
    }
    return false;
  } finally {
    // Restore original template content
    try {
      await writeFile(templateFile, originalContent, 'utf-8');
    } catch (error) {
      logger.error('Failed to restore template file:', error);
      // Even if restore fails, it doesn't affect the test result
    }
  }
}