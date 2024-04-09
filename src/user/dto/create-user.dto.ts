import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
