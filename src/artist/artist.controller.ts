import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistService } from './artist.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.artistService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id) {
    return this.artistService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true }))
    createArtirstDto: CreateArtistDto,
  ) {
    return this.artistService.create(createArtirstDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id,
    @Body(new ValidationPipe({ whitelist: true }))
    updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id) {
    return this.artistService.delete(id);
  }
}
