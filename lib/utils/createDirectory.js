import fs from 'fs';
export function createDirectory(directoryName) {
    return new Promise((resolve, reject) => {
      const dirPath = `./${directoryName}`;
      fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
          console.error(`Error creating directory: ${err}`);
          reject(err);
        } else {
          console.log(`Directory created successfully: ${dirPath}`);
          resolve(dirPath);
        }
      });
    });
  }
  export default createDirectory;