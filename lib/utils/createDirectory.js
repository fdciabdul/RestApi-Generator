import fs from 'fs';
export function createDirectory(directoryName) {
    const dirPath = `./${directoryName}`;
  
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err}`);
      } else {
        console.log(`Directory created successfully: ${dirPath}`);
      }
    });
  }
  
  export default createDirectory;