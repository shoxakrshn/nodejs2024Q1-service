import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/database/database';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './album.model';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  getAll() {
    return [...DbService.albums.values()];
  }

  getById(id: string) {
    if (!DbService.albums.has(id)) {
      throw new NotFoundException('Album not found');
    }

    return DbService.albums.get(id);
  }

  create({ name, year, artistId }: CreateAlbumDto) {
    const newAlbum = new Album(name, year, artistId);
    DbService.albums.set(newAlbum.id, newAlbum);

    return newAlbum;
  }

  update(id: string, updateArtistDto: UpdateAlbumDto) {
    if (!DbService.albums.has(id)) {
      throw new NotFoundException('Album not found');
    }

    const album = DbService.albums.get(id);
    const updatedAlbum = { ...album, ...updateArtistDto };
    DbService.albums.set(id, updatedAlbum);

    return updatedAlbum;
  }

  delete(id: string) {
    if (!DbService.albums.has(id)) {
      throw new NotFoundException('Album not found');
    }

    DbService.tracks.forEach((value, key) => {
      if (value.albumId === id) {
        const track = DbService.tracks.get(key);
        track.albumId = null;
      }
    });

    DbService.favs.deleteAlbum(id);

    DbService.albums.delete(id);
  }
}
