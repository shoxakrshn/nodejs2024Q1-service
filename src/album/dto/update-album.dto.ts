import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { Prisma } from '@prisma/client';

export class UpdateAlbumDto
  extends PartialType(CreateAlbumDto)
  implements Prisma.ArtistUpdateInput {}
