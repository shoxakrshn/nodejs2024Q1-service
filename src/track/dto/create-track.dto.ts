import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto implements Prisma.TrackCreateInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
