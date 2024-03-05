import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/database/database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './artist.model';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  getAll() {
    return [...DbService.artists.values()];
  }

  getById(id: string) {
    if (!DbService.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    return DbService.artists.get(id);
  }

  create({ name, grammy }: CreateArtistDto) {
    const newArtist = new Artist(name, grammy);
    DbService.artists.set(newArtist.id, newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!DbService.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    const artist = DbService.artists.get(id);
    const updatedArtist = { ...artist, ...updateArtistDto };
    DbService.artists.set(id, updatedArtist);

    return updatedArtist;
  }

  delete(id: string) {
    if (!DbService.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    DbService.albums.forEach((value, key) => {
      if (value.artistId === id) {
        const album = DbService.albums.get(key);
        album.artistId = null;
      }
    });

    DbService.tracks.forEach((value, key) => {
      if (value.artistId === id) {
        const track = DbService.tracks.get(key);
        track.artistId = null;
      }
    });

    DbService.favs.deleteArtist(id);

    DbService.artists.delete(id);
  }
}
