import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  artistId: string | null;

  @IsString()
  @IsNotEmpty()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
