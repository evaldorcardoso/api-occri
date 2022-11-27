import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto } from '../images/dto/create-image.dto';
import { ImagesRepository } from '../images/images.repository';
import { CreateSpaceDto } from './dto/create-space.dto';
import { FindSpacesQueryDto } from './dto/find-spaces-query.dto';
import { ReturnFindSpacesDto } from './dto/return-find-spaces.dto';
import { ReturnSpaceWithPlansDto } from './dto/return-space-with-plans.dto';
import { ReturnSpaceDto } from './dto/return-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { SpacesRepository } from './spaces.repository';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(SpacesRepository)
    private spacesRepository: SpacesRepository,
    @InjectRepository(ImagesRepository)
    private imagesRepository: ImagesRepository
  ) { }

  async create(createSpaceDto: CreateSpaceDto): Promise<ReturnSpaceDto> {
    const space = this.spacesRepository.create(createSpaceDto);
    await this.spacesRepository.save(space);
    return new ReturnSpaceDto(space);
  }

  async addImage(spaceUuid: string, imageDto: CreateImageDto): Promise<ReturnSpaceDto> {
    const image = this.imagesRepository.create(imageDto);
    await this.imagesRepository.save(image);

    const space = await this.spacesRepository.findOne({
      where: { uuid: spaceUuid, }, relations: ['images']
    });
    space.images.push(image);
    await this.spacesRepository.save(space);

    return new ReturnSpaceDto(space);
  }

  async findAll(queryDto: FindSpacesQueryDto): Promise<ReturnFindSpacesDto> {
    return await this.spacesRepository.findSpaces(queryDto);
  }

  async findOne(uuid: string): Promise<ReturnSpaceWithPlansDto> {
    const space = await this.spacesRepository.findOne({
      where: {
        uuid: uuid,
      },
      relations: ['plans', 'images'],
    });
    if (!space) {
      throw new Error('Espaço não encontrado');
    }
    return new ReturnSpaceWithPlansDto(space);
  }

  async update(
    uuid: string,
    updateSpaceDto: UpdateSpaceDto
  ): Promise<ReturnSpaceDto> {
    const result = await this.spacesRepository.update({ uuid }, updateSpaceDto);
    if (result.affected === 0) {
      throw new Error('Espaço não encontrado');
    }
    const space = await this.spacesRepository.findOne({ uuid });
    return new ReturnSpaceDto(space);
  }

  async remove(uuid: string) {
    const result = await this.spacesRepository.delete({ uuid });
    if (result.affected === 0) {
      throw new Error('Espaço não encontrado');
    }
  }
}
