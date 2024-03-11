import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    return await this.databaseService.artist.findMany();
  }

  async getById(id: string) {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async create(createArtirstDto: CreateArtistDto) {
    return await this.databaseService.artist.create({ data: createArtirstDto });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.databaseService.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch {
      throw new NotFoundException('Artist not found');
    }
  }

  async delete(id: string) {
    try {
      await this.databaseService.artist.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException('Artist not found');
    }
  }
}
