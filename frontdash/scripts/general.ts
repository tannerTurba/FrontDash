import fs from 'fs';

export async function saveFileToServer(file: File, filePath: string): Promise<string> {    
    // Read the contents of the file using FileReader
    const fileContents = await readFile(file);

    // Write the file contents to the specified directory
    await writeFile(filePath, fileContents);

    return filePath;
  }

  function readFile(file: File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result instanceof ArrayBuffer) {
                // Convert ArrayBuffer to Buffer
                resolve(Buffer.from(reader.result));
            } else {
                reject(new Error('Failed to read file contents'));
            }
        };

        reader.onerror = (event) => {
            reject(new Error(`Failed to read file: ${event}`));
        };

        reader.readAsArrayBuffer(file);
    });
}

function writeFile(filePath: string, data: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}