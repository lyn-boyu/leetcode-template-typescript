#!/usr/bin/env bun
import { parseArgs } from './utils/args';
import { runTests } from './core/test-runner';
import { transpileFiles } from './core/transpiler';
import { commitChanges } from './core/git';
import { logger } from './utils/logger';
import { validateProblemDir } from './utils/validator';

async function main() {
  try {
    // 解析命令行参数
    const { problemNumber, dryRun } = parseArgs(process.argv.slice(2));
    const paddedNumber = problemNumber.toString().padStart(4, '0');
    
    // 验证并获取问题目录
    logger.info(`Looking for problem ${paddedNumber}...`);
    const problemDir = await validateProblemDir(paddedNumber);
    logger.success(`Found problem directory: ${problemDir}`);
    
    // 运行测试
    logger.info('Running tests...');
    const testsPassed = await runTests(problemDir);
    if (!testsPassed) {
      logger.error('Tests failed. Please fix the failing tests before proceeding.');
      process.exit(1);
    }
    logger.success('All tests passed!');

    // 转译文件
    logger.info('Transpiling files...');
    try {
      await transpileFiles(problemDir);
      logger.success('Files transpiled successfully!');
    } catch (error) {
      logger.error('Transpilation failed. Please check the error messages above.');
      process.exit(1);
    }

    // 提交更改
    if (!dryRun) {
      logger.info('Committing changes...');
      try {
        await commitChanges(problemDir);
        logger.success('Changes committed successfully!');
      } catch (error) {
        logger.error('Git commit failed. Please check the error messages above.');
        process.exit(1);
      }
    } else {
      logger.info('Dry run mode - skipping git commit');
    }

  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    } else {
      logger.error('An unexpected error occurred:', error);
    }
    process.exit(1);
  }
}

main();