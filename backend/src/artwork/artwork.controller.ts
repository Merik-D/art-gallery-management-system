import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';

import { ArtworkService } from './artwork.service';
import { ArtworkDto } from './dto/artwork.dto';

@Controller('artworks')
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) { }

  @Get("/artists")
  async getArtists() {
    return await this.artworkService.getArtists();
  }

  @Get("/types")
  async getTypes() {
    return await this.artworkService.getTypes();
  }

  @Post()
  async create(@Body() createArtworkDto: ArtworkDto) {
    return await this.artworkService.create(createArtworkDto);
  }

  @Get()
  async findAll(
    @Query('price') price?: string,
    @Query('artist') artist?: string,
    @Query('type') type?: string,
  ) {
    return await this.artworkService.findAll({ price, artist, type });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.artworkService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateArtworkDto: ArtworkDto) {
    return await this.artworkService.update(id, updateArtworkDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.artworkService.remove(id);
  }
}
