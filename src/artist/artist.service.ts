import { Injectable, NotFoundException } from '@nestjs/common';
import { albumDb, artistDb, favoriteDb, trackDb } from 'src/database/database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './artist.model';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  getAll() {
    return [...artistDb.values()];
  }

  getById(id: string) {
    if (!artistDb.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    return artistDb.get(id);
  }

  create({ name, grammy }: CreateArtistDto) {
    const newArtist = new Artist(name, grammy);
    artistDb.set(newArtist.id, newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!artistDb.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    const artist = artistDb.get(id);
    const updatedArtist = { ...artist, ...updateArtistDto };
    artistDb.set(id, updatedArtist);

    return updatedArtist;
  }

  delete(id: string) {
    if (!artistDb.has(id)) {
      throw new NotFoundException('Artist not found');
    }

    albumDb.forEach((value, key) => {
      if (value.artistId === id) {
        const album = albumDb.get(key);
        album.artistId = null;
      }
    });

    trackDb.forEach((value, key) => {
      if (value.artistId === id) {
        const track = trackDb.get(key);
        track.artistId = null;
      }
    });

    favoriteDb.deleteArtist(id);

    artistDb.delete(id);
  }
}
