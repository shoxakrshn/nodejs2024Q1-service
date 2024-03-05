import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { eFavs } from './favs.model';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    return this.dbService.favs;
  }

  addArtist(id: string) {
    if (!this.dbService.artists.has(id)) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }

    const artist = this.dbService.artists.get(id);
    this.dbService.favs.addArtist(artist);

    return artist;
  }

  deleteArtist(id: string) {
    if (!this.dbService.favs.has(id, eFavs.artists)) {
      throw new NotFoundException('This track is not favorite');
    }

    this.dbService.favs.deleteArtist(id);
  }

  addAlbum(id: string) {
    if (!this.dbService.albums.has(id)) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }

    const album = this.dbService.albums.get(id);
    this.dbService.favs.addAlbum(album);

    return album;
  }

  deleteAlbum(id: string) {
    if (!this.dbService.favs.has(id, eFavs.albums)) {
      throw new NotFoundException('This Album is not favorite');
    }

    this.dbService.favs.deleteAlbum(id);
  }

  addTrack(id: string) {
    if (!this.dbService.tracks.has(id)) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }

    const track = this.dbService.tracks.get(id);
    this.dbService.favs.addTrack(track);

    return track;
  }

  deleteTrack(id: string) {
    if (!this.dbService.favs.has(id, eFavs.tracks)) {
      throw new NotFoundException('This track is not favorite');
    }

    this.dbService.favs.deleteTrack(id);
  }
}
