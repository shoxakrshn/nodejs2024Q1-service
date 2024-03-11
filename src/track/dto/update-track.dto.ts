import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { Prisma } from '@prisma/client';

export class UpdateTrackDto
  extends PartialType(CreateTrackDto)
  implements Prisma.TrackUpdateInput {}
