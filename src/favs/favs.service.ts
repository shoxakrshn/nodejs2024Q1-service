import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

const defaultFavoriteId = '1';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getAll() {
    const favs = await this.databaseService.favorites.findUnique({
      where: { id: '1' },
      select: { artists: true, albums: true, tracks: true },
    });

    if (!favs) {
      return { artists: [], albums: [], tracks: [] };
    }

    return favs;
  }

  async addArtist(id: string) {
    try {
      return await this.databaseService.artist.update({
        where: { id },
        data: {
          favorites: {
            connectOrCreate: {
              where: { id: defaultFavoriteId },
              create: { id: defaultFavoriteId },
            },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
  }

  async deleteArtist(id: string) {
    try {
      return await this.databaseService.artist.update({
        where: { id },
        data: {
          favorites: {
            disconnect: { id: defaultFavoriteId },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
  }

  async addAlbum(id: string) {
    try {
      return await this.databaseService.album.update({
        where: { id },
        data: {
          favorites: {
            connectOrCreate: {
              where: { id: defaultFavoriteId },
              create: { id: defaultFavoriteId },
            },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
  }

  async deleteAlbum(id: string) {
    try {
      return await this.databaseService.album.update({
        where: { id },
        data: {
          favorites: {
            disconnect: { id: defaultFavoriteId },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
  }

  async addTrack(id: string) {
    try {
      return await this.databaseService.track.update({
        where: { id },
        data: {
          favorites: {
            connectOrCreate: {
              where: { id: defaultFavoriteId },
              create: { id: defaultFavoriteId },
            },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
  }

  async deleteTrack(id: string) {
    try {
      return await this.databaseService.track.update({
        where: { id },
        data: {
          favorites: {
            disconnect: { id: defaultFavoriteId },
          },
        },
      });
    } catch {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
  }
}
