import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albumDb, artistDb, favoriteDb, trackDb } from 'src/database/database';
import { eFavs } from './favs.model';

@Injectable()
export class FavsService {
  getAll() {
    return favoriteDb;
  }

  addArtist(id: string) {
    if (!artistDb.has(id)) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }

    const artist = artistDb.get(id);
    favoriteDb.addArtist(artist);

    return artist;
  }

  deleteArtist(id: string) {
    if (!favoriteDb.has(id, eFavs.artists)) {
      throw new NotFoundException('This track is not favorite');
    }

    favoriteDb.deleteArtist(id);
  }

  addAlbum(id: string) {
    if (!albumDb.has(id)) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }

    const album = albumDb.get(id);
    favoriteDb.addAlbum(album);

    return album;
  }

  deleteAlbum(id: string) {
    if (!favoriteDb.has(id, eFavs.albums)) {
      throw new NotFoundException('This Album is not favorite');
    }

    favoriteDb.deleteAlbum(id);
  }

  addTrack(id: string) {
    if (!trackDb.has(id)) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }

    const track = trackDb.get(id);
    favoriteDb.addTrack(track);

    return track;
  }

  deleteTrack(id: string) {
    if (!favoriteDb.has(id, eFavs.tracks)) {
      throw new NotFoundException('This track is not favorite');
    }

    favoriteDb.deleteTrack(id);
  }
}
