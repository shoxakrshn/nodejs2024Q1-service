import { Injectable, NotFoundException } from '@nestjs/common';
import { artistDb } from 'src/database/database';
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
      throw new NotFoundException('User not found');
    }

    const artist = artistDb.get(id);
    const updateArtist = { ...artist, ...updateArtistDto };
    artistDb.set(id, updateArtist);

    return updateArtist;
  }

  delete(id: string) {
    if (!artistDb.has(id)) {
      throw new NotFoundException('User not found');
    }

    artistDb.delete(id);
  }
}
