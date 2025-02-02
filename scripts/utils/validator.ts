import { readdir } from 'fs/promises';
import { join } from 'path';

export async function validateProblemDir(paddedNumber: string): Promise<string> {
  const baseDir = process.cwd();
  
  try {
    const entries = await readdir(baseDir, { withFileTypes: true });
    
    // 查找匹配的问题目录
    const problemDir = entries.find(entry => {
      return entry.isDirectory() && 
             entry.name.startsWith(paddedNumber) &&
             /^\d{4}-[a-z-]+(easy|medium|hard)$/.test(entry.name);
    });

    if (!problemDir) {
      throw new Error(`Problem directory ${paddedNumber} not found`);
    }

    return join(baseDir, problemDir.name);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to validate problem directory: ${error}`);
  }
}