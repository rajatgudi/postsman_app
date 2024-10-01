import { PartialType } from '@nestjs/mapped-types';
import { UpdateDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(UpdateDto) {}
