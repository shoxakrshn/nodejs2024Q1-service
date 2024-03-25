import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}
  async getAll() {
    return await this.databaseService.track.findMany();
  }

  async getById(id: string) {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async create(createTrackDto: CreateTrackDto) {
    try {
      return await this.databaseService.track.create({
        data: createTrackDto,
      });
    } catch {
      throw new NotFoundException('Track not found');
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return await this.databaseService.track.update({
      where: { id },
      data: updateTrackDto,
    });
  }

  async delete(id: string) {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.databaseService.track.delete({ where: { id } });
  }
}
