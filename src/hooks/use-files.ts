import { useState, useEffect } from 'react';

export function useFiles() {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);

  useEffect(() => {
    fetch('/api/files')
      .then(res => res.json())
      .then(data => {
        if (data.files) {
          setFiles(data.files);
          setSelectedFiles(data.files);
        }
      })
      .catch(err => console.error('Error fetching files:', err))
      .finally(() => setIsLoadingFiles(false));
  }, []);

  const toggleFile = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName) 
        ? prev.filter(f => f !== fileName) 
        : [...prev, fileName]
    );
  };

  const toggleAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files);
    }
  };

  return { files, selectedFiles, toggleFile, toggleAll, isLoadingFiles };
}
