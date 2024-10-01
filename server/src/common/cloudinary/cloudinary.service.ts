import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
// import toStream from 'buffer-to-stream';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file) {
      throw new NotFoundException('No file found');
    }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        console.log('result', result);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
