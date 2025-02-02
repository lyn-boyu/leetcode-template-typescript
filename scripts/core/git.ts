import { exec } from 'child_process';
import { promisify } from 'util';
import { basename } from 'path';
import { logger } from '../utils/logger';

const execAsync = promisify(exec);

function getDifficulty(dirName: string): { code: string; full: string } {
  const lowerDirName = dirName.toLowerCase();
  if (lowerDirName.endsWith('easy')) return { code: 'E', full: 'Easy' };
  if (lowerDirName.endsWith('medium')) return { code: 'M', full: 'Medium' };
  if (lowerDirName.endsWith('hard')) return { code: 'H', full: 'Hard' };
  throw new Error(`Unable to determine difficulty from directory name: ${dirName}`);
}

function formatTitle(dirName: string): string {
  // 移除题号前缀和难度后缀
  const titlePart = dirName.replace(/^\d{4}-/, '').replace(/-(?:easy|medium|hard)$/i, '');
  
  return titlePart
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function commitChanges(problemDir: string): Promise<void> {
  try {
    const dirName = basename(problemDir);
    const difficulty = getDifficulty(dirName);
    const title = formatTitle(dirName);
    const problemNumber = dirName.split('-')[0];

    const commitMessage = 
      `feat(problem-${problemNumber}${difficulty.code}): ${title} [${difficulty.full}]`;

    // 使用 promisify 后的 exec 替代 spawn
    await execAsync(`git add "${problemDir}"`);
    await execAsync(`git commit -m "${commitMessage}"`);
    
    logger.success(`Changes committed with message: ${commitMessage}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Git operation failed:', error);
      throw error;
    }
    throw new Error(`Git operation failed: ${error}`);
  }
}