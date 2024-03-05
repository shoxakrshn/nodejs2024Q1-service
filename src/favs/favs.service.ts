import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { dbService } from 'src/database/database';
import { eFavs } from './favs.model';

@Injectable()
export class FavsService {
  getAll() {
    return dbService.favs;
  }

  addArtist(id: string) {
    if (!dbService.artists.has(id)) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }

    const artist = dbService.artists.get(id);
    dbService.favs.addArtist(artist);

    return artist;
  }

  deleteArtist(id: string) {
    if (!dbService.favs.has(id, eFavs.artists)) {
      throw new NotFoundException('This track is not favorite');
    }

    dbService.favs.deleteArtist(id);
  }

  addAlbum(id: string) {
    if (!dbService.albums.has(id)) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }

    const album = dbService.albums.get(id);
    dbService.favs.addAlbum(album);

    return album;
  }

  deleteAlbum(id: string) {
    if (!dbService.favs.has(id, eFavs.albums)) {
      throw new NotFoundException('This Album is not favorite');
    }

    dbService.favs.deleteAlbum(id);
  }

  addTrack(id: string) {
    if (!dbService.tracks.has(id)) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }

    const track = dbService.tracks.get(id);
    dbService.favs.addTrack(track);

    return track;
  }

  deleteTrack(id: string) {
    if (!dbService.favs.has(id, eFavs.tracks)) {
      throw new NotFoundException('This track is not favorite');
    }

    dbService.favs.deleteTrack(id);
  }
}
