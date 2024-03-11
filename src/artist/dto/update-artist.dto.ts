import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { Prisma } from '@prisma/client';

export class UpdateArtistDto
  extends PartialType(CreateArtistDto)
  implements Prisma.ArtistUpdateInput {}
