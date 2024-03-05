import { Injectable, NotFoundException } from '@nestjs/common';
import { dbService } from 'src/database/database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './artist.model';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  getAll() {
    return [...dbService.artists.values()];
  }

  getById(id: string) {
    if (!dbService.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    return dbService.artists.get(id);
  }

  create({ name, grammy }: CreateArtistDto) {
    const newArtist = new Artist(name, grammy);
    dbService.artists.set(newArtist.id, newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!dbService.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    const artist = dbService.artists.get(id);
    const updatedArtist = { ...artist, ...updateArtistDto };
    dbService.artists.set(id, updatedArtist);

    return updatedArtist;
  }

  delete(id: string) {
    if (!dbService.artists.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    dbService.albums.forEach((value, key) => {
      if (value.artistId === id) {
        const album = dbService.albums.get(key);
        album.artistId = null;
      }
    });

    dbService.tracks.forEach((value, key) => {
      if (value.artistId === id) {
        const track = dbService.tracks.get(key);
        track.artistId = null;
      }
    });

    dbService.favs.deleteArtist(id);

    dbService.artists.delete(id);
  }
}
