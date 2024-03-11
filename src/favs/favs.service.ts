import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

const artistFileds = {
  id: true,
  name: true,
  grammy: true,
};

const albumFields = {
  id: true,
  name: true,
  year: true,
  artistId: true,
};

const trackFields = {
  id: true,
  name: true,
  artistId: true,
  albumId: true,
  duration: true,
};

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getAll() {
    const artists = await this.databaseService.artist.findMany({
      where: { favorite: true },
      select: artistFileds,
    });

    const albums = await this.databaseService.album.findMany({
      where: { favorite: true },
      select: albumFields,
    });

    const tracks = await this.databaseService.track.findMany({
      where: { favorite: true },
      select: trackFields,
    });

    return { artists, albums, tracks };
  }
  async addArtist(id: string) {
    try {
      return await this.databaseService.artist.update({
        where: { id },
        data: { favorite: true },
        select: artistFileds,
      });
    } catch {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
  }

  async deleteArtist(id: string) {
    try {
      await this.databaseService.artist.update({
        where: { id },
        data: { favorite: false },
      });
    } catch {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }
  }

  async addAlbum(id: string) {
    try {
      return await this.databaseService.album.update({
        where: { id },
        data: { favorite: true },
        select: albumFields,
      });
    } catch {
      throw new UnprocessableEntityException("Album doesn't exist");
    }
  }

  async deleteAlbum(id: string) {
    try {
      await this.databaseService.album.update({
        where: { id },
        data: { favorite: false },
      });
    } catch {
      throw new UnprocessableEntityException("Album doesn't exist");
    }
  }

  async addTrack(id: string) {
    try {
      return await this.databaseService.track.update({
        where: { id },
        data: { favorite: true },
        select: trackFields,
      });
    } catch {
      throw new UnprocessableEntityException("Track doesn't exist");
    }
  }

  async deleteTrack(id: string) {
    try {
      await this.databaseService.track.update({
        where: { id },
        data: { favorite: false },
      });
    } catch {
      throw new UnprocessableEntityException("Track doesn't exist");
    }
  }
}
