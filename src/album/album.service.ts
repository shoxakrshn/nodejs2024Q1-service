import { Injectable, NotFoundException } from '@nestjs/common';
import { albumDb, favoriteDb, trackDb } from 'src/database/database';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './album.model';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  getAll() {
    return [...albumDb.values()];
  }

  getById(id: string) {
    if (!albumDb.has(id)) {
      throw new NotFoundException('Album not found');
    }

    return albumDb.get(id);
  }

  create({ name, year, artistId }: CreateAlbumDto) {
    const newAlbum = new Album(name, year, artistId);
    albumDb.set(newAlbum.id, newAlbum);

    return newAlbum;
  }

  update(id: string, updateArtistDto: UpdateAlbumDto) {
    if (!albumDb.has(id)) {
      throw new NotFoundException('Album not found');
    }

    const album = albumDb.get(id);
    const updatedAlbum = { ...album, ...updateArtistDto };
    albumDb.set(id, updatedAlbum);

    return updatedAlbum;
  }

  delete(id: string) {
    if (!albumDb.has(id)) {
      throw new NotFoundException('Album not found');
    }

    trackDb.forEach((value, key) => {
      if (value.artistId === id) {
        const track = trackDb.get(key);
        track.albumId = null;
      }
    });

    favoriteDb.deleteAlbum(id);

    albumDb.delete(id);
  }
}
