import { promises as fs } from 'fs';
import path from 'path';
import { existsSync } from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function listAvailableFiles() {
  if (!existsSync(DATA_DIR)) {
    return [];
  }

  const files = await fs.readdir(DATA_DIR);
  return files.filter(file => 
    file.endsWith('.md') || 
    file.endsWith('.txt') || 
    file.endsWith('.pdf')
  );
}

export async function getFileContent(fileName: string): Promise<string> {
  const filePath = path.join(DATA_DIR, fileName);
  
  if (fileName.endsWith('.md') || fileName.endsWith('.txt')) {
    return await fs.readFile(filePath, 'utf-8');
  } 
  
  if (fileName.endsWith('.pdf')) {
    const pdf = (await import('pdf-parse')).default;
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  }

  throw new Error(`Unsupported file type: ${fileName}`);
}
