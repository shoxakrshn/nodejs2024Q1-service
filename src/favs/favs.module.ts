import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [DatabaseModule, JwtModule],
})
export class FavsModule {}
