import { Injectable, NotFoundException } from '@nestjs/common';
import { dbService } from 'src/database/database';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './album.model';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  getAll() {
    return [...dbService.albums.values()];
  }

  getById(id: string) {
    if (!dbService.albums.has(id)) {
      throw new NotFoundException('Album not found');
    }

    return dbService.albums.get(id);
  }

  create({ name, year, artistId }: CreateAlbumDto) {
    const newAlbum = new Album(name, year, artistId);
    dbService.albums.set(newAlbum.id, newAlbum);

    return newAlbum;
  }

  update(id: string, updateArtistDto: UpdateAlbumDto) {
    if (!dbService.albums.has(id)) {
      throw new NotFoundException('Album not found');
    }

    const album = dbService.albums.get(id);
    const updatedAlbum = { ...album, ...updateArtistDto };
    dbService.albums.set(id, updatedAlbum);

    return updatedAlbum;
  }

  delete(id: string) {
    if (!dbService.albums.has(id)) {
      throw new NotFoundException('Album not found');
    }

    dbService.tracks.forEach((value, key) => {
      if (value.albumId === id) {
        const track = dbService.tracks.get(key);
        track.albumId = null;
      }
    });

    dbService.favs.deleteAlbum(id);

    dbService.albums.delete(id);
  }
}
