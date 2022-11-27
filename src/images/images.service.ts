import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { ReturnImageDto } from './dto/return-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesRepository } from './images.repository';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository
  ) { }

  async update(uuid: string, updateImageDto: UpdateImageDto): Promise<ReturnImageDto> {
    const result = await this.imagesRepository.update({ uuid }, updateImageDto);
    if (result.affected === 0) {
      throw new Error('Imagem não encontrada');
    }
    const image = await this.imagesRepository.findOne({ uuid });
    return new ReturnImageDto(image);
  }

  async remove(uuid: string) {
    const result = await this.imagesRepository.delete({ uuid });
    if (result.affected === 0) {
      throw new Error('Imagem não encontrada');
    }
  }
}
