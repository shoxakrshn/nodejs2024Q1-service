import { Injectable, NotFoundException } from '@nestjs/common';
import { favoriteDb, trackDb } from 'src/database/database';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './track.model';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  getAll() {
    return [...trackDb.values()];
  }

  getById(id: string) {
    if (!trackDb.has(id)) {
      throw new NotFoundException('Track not found');
    }
    return trackDb.get(id);
  }

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack = new Track(name, artistId, albumId, duration);
    trackDb.set(newTrack.id, newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!trackDb.has(id)) {
      throw new NotFoundException('Track not found');
    }

    const track = trackDb.get(id);
    const updatedTrack = { ...track, ...updateTrackDto };
    trackDb.set(id, updatedTrack);

    return updatedTrack;
  }

  delete(id: string) {
    if (!trackDb.has(id)) {
      throw new NotFoundException('Track not found');
    }

    favoriteDb.deleteTrack(id);
    trackDb.delete(id);
  }
}
