import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/database/database';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './track.model';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  getAll() {
    return [...DbService.tracks.values()];
  }

  getById(id: string) {
    if (!DbService.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }
    return DbService.tracks.get(id);
  }

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack = new Track(name, artistId, albumId, duration);
    DbService.tracks.set(newTrack.id, newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!DbService.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }

    const track = DbService.tracks.get(id);
    const updatedTrack = { ...track, ...updateTrackDto };
    DbService.tracks.set(id, updatedTrack);

    return updatedTrack;
  }

  delete(id: string) {
    if (!DbService.tracks.has(id)) {
      throw new NotFoundException('Track not found');
    }

    DbService.favs.deleteTrack(id);
    DbService.tracks.delete(id);
  }
}
