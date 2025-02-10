import fs from 'fs';

export const saveImage = async (imagePath: string, imageBuffer: Buffer): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(imagePath, imageBuffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
