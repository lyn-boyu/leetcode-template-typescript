import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export async function updateLoggerConfig(updates: Partial<any>): Promise<void> {
    const configPath = join(process.cwd(), 'scripts', 'config', 'logger.config.json');

    try {
        const content = await readFile(configPath, 'utf-8');
        const config = JSON.parse(content);
        const updatedConfig = { ...config, ...updates };

        await writeFile(configPath, JSON.stringify(updatedConfig, null, 2), 'utf-8');
    } catch (error) {
        console.error('Failed to update logger config:', error);
    }
}