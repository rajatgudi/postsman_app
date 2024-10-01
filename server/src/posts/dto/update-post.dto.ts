import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  caption: string;

  @IsString()
  @IsOptional()
  image: string;
}
