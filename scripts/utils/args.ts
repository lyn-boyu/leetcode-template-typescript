interface CliArgs {
  problemNumber: number;
  dryRun: boolean;
}

export function parseArgs(args: string[]): CliArgs {
  let problemNumber: number | undefined;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    // 支持直接传入数字作为第一个参数
    if (i === 0 && !arg.startsWith('-')) {
      const num = parseInt(arg);
      if (!isNaN(num)) {
        problemNumber = num;
        continue;
      }
    }
    
    if (arg === '--problem' || arg === '-p') {
      const num = parseInt(args[++i]);
      if (isNaN(num)) {
        throw new Error('Invalid problem number');
      }
      problemNumber = num;
    } else if (arg === '--dry-run') {
      dryRun = true;
    }
  }

  if (!problemNumber) {
    throw new Error('Problem number is required (as first argument or with --problem/-p)');
  }

  // 验证题目编号范围
  if (problemNumber < 1 || problemNumber > 9999) {
    throw new Error('Problem number must be between 1 and 9999');
  }

  return { problemNumber, dryRun };
}