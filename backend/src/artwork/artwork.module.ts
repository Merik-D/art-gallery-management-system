import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';
import { Artwork } from './entities/artwork.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artwork])],
  controllers: [ArtworkController],
  providers: [ArtworkService],
})
export class ArtworkModule { }
