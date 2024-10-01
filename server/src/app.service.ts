import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from './common/cloudinary/cloudinary.service';

@Injectable()
export class AppService {
  constructor(private cloudinary: CloudinaryService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async uploadImageCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch((err) => {
      console.log('errror', err);
      throw new BadRequestException('Invalid File type');
    });
  }
}
