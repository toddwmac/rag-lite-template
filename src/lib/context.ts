import { listAvailableFiles, getFileContent } from './file-service';

export async function getFiles() {
  return await listAvailableFiles();
}

export async function getContext(selectedFiles?: string[]) {
  const availableFiles = await listAvailableFiles();
  
  // If selectedFiles is provided, filter; otherwise use all valid files
  const filesToRead = selectedFiles && selectedFiles.length > 0 
    ? availableFiles.filter(f => selectedFiles.includes(f))
    : availableFiles;

  let context = '';

  for (const file of filesToRead) {
    try {
      const content = await getFileContent(file);
      const type = file.endsWith('.pdf') ? ' (PDF)' : '';
      context += `
--- Document: ${file}${type} ---
${content}
`;
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
      context += `
--- Document: ${file} (Error reading) ---
`;
    }
  }

  return context;
}