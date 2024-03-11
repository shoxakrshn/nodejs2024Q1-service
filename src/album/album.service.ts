import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getAll() {
    return await this.databaseService.album.findMany();
  }

  async getById(id: string) {
    const album = await this.databaseService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async create(CreateAlbumDto: CreateAlbumDto) {
    return this.databaseService.album.create({ data: CreateAlbumDto });
  }

  async update(id: string, updateArtistDto: UpdateAlbumDto) {
    try {
      return await this.databaseService.album.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch {
      throw new NotFoundException('Album not found');
    }
  }

  async delete(id: string) {
    try {
      await this.databaseService.album.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Album not found');
    }
  }
}
