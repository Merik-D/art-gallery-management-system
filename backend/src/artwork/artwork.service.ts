import { Repository } from 'typeorm';

import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ArtworkDto } from './dto/artwork.dto';
import { Artwork } from './entities/artwork.entity';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,
  ) { }

  async create(createArtworkDto: ArtworkDto) {
    const where = {
      title: createArtworkDto.title,
      artist: createArtworkDto.artist,
      type: createArtworkDto.type,
    };

    const existingArtwork = await this.artworkRepository.findOne({ where });
    if (existingArtwork) {
      throw new ConflictException('Artwork with this title, artist, and type already exists.');
    }
    return await this.artworkRepository.save(createArtworkDto);
  }

  async findAll(
    { price, artist, type }: { price?: string; artist?: string; type?: string },
  ) {
    const where: any = {};

    if (artist) where.artist = artist;
    if (type) where.type = type;

    const order: any = {};

    if (price) {
      if (price === 'asc') {
        order.price = 'ASC';
      } else if (price === "desc") {
        order.price = 'DESC'
      }
    }

    return await this.artworkRepository.find({
      where,
      order,
    });
  }

  async findOne(id: string) {
    const artwork = await this.artworkRepository.findOne({ where: { id } });
    if (!artwork) {
      throw new NotFoundException(`Artwork with ID ${id} not found`);
    }
    return artwork;
  }

  async update(id: string, updateArtworkDto: ArtworkDto) {
    const artwork = await this.findOne(id);
    Object.assign(artwork, updateArtworkDto);
    return await this.artworkRepository.save(artwork);
  }

  async remove(id: string) {
    const artwork = await this.findOne(id);
    return await this.artworkRepository.delete(artwork);
  }

  async getArtists(): Promise<string[]> {
    const artists = await this.artworkRepository
      .createQueryBuilder('artwork')
      .select('DISTINCT artwork.artist', 'artist')
      .getRawMany();

    return artists.map(a => a.artist);
  }

  async getTypes(): Promise<string[]> {
    const types = await this.artworkRepository
      .createQueryBuilder('artwork')
      .select('DISTINCT artwork.type', 'type')
      .getRawMany();

    return types.map(t => t.type);
  }
}
