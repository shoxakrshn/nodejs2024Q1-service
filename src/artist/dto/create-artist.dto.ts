import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateArtistDto implements Prisma.ArtistCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
