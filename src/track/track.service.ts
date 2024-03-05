import { Injectable, NotFoundException } from '@nestjs/common';
import { dbService } from 'src/database/database';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './track.model';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  getAll() {
    return [...dbService.tracks.values()];
  }

  getById(id: string) {
    if (!dbService.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }
    return dbService.tracks.get(id);
  }

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack = new Track(name, artistId, albumId, duration);
    dbService.tracks.set(newTrack.id, newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!dbService.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }

    const track = dbService.tracks.get(id);
    const updatedTrack = { ...track, ...updateTrackDto };
    dbService.tracks.set(id, updatedTrack);

    return updatedTrack;
  }

  delete(id: string) {
    if (!dbService.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }

    dbService.favs.deleteTrack(id);
    dbService.tracks.delete(id);
  }
}
