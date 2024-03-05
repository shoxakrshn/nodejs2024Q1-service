import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from 'src/database/database';
import { eFavs } from './favs.model';

@Injectable()
export class FavsService {
  getAll() {
    return DbService.favs;
  }

  addArtist(id: string) {
    if (!DbService.artists.has(id)) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }

    const artist = DbService.artists.get(id);
    DbService.favs.addArtist(artist);

    return artist;
  }

  deleteArtist(id: string) {
    if (!DbService.favs.has(id, eFavs.artists)) {
      throw new NotFoundException('This track is not favorite');
    }

    DbService.favs.deleteArtist(id);
  }

  addAlbum(id: string) {
    if (!DbService.albums.has(id)) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }

    const album = DbService.albums.get(id);
    DbService.favs.addAlbum(album);

    return album;
  }

  deleteAlbum(id: string) {
    if (!DbService.favs.has(id, eFavs.albums)) {
      throw new NotFoundException('This Album is not favorite');
    }

    DbService.favs.deleteAlbum(id);
  }

  addTrack(id: string) {
    if (!DbService.tracks.has(id)) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }

    const track = DbService.tracks.get(id);
    DbService.favs.addTrack(track);

    return track;
  }

  deleteTrack(id: string) {
    if (!DbService.favs.has(id, eFavs.tracks)) {
      throw new NotFoundException('This track is not favorite');
    }

    DbService.favs.deleteTrack(id);
  }
}
