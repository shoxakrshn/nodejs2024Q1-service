import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.favsService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post('artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.addArtist(id);
  }

  @UseGuards(AuthGuard)
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.deleteArtist(id);
  }

  @UseGuards(AuthGuard)
  @Post('album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.addAlbum(id);
  }

  @UseGuards(AuthGuard)
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.deleteAlbum(id);
  }

  @UseGuards(AuthGuard)
  @Post('track/:id')
  addTack(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.addTrack(id);
  }

  @UseGuards(AuthGuard)
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', ParseUUIDPipe) id) {
    return this.favsService.deleteTrack(id);
  }
}
