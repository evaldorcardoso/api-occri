import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';
import { FindSpacesQueryDto } from './dto/find-spaces-query.dto';
import { ReturnFindSpacesDto } from './dto/return-find-spaces.dto';
import { ReturnSpaceDto } from './dto/return-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { SpacesRepository } from './spaces.repository';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(SpacesRepository)
    private spacesRepository: SpacesRepository,
  ) {}

  async create(createSpaceDto: CreateSpaceDto): Promise<ReturnSpaceDto> {
    const space = await this.spacesRepository.create(createSpaceDto);
    return new ReturnSpaceDto(space);
  }

  async findAll(queryDto: FindSpacesQueryDto): Promise<ReturnFindSpacesDto> {
    return await this.spacesRepository.findSpaces(queryDto);
  }

  async findOne(uuid: string): Promise<ReturnSpaceDto> {
    const space = await this.spacesRepository.findOne(uuid);
    if (!space) {
      throw new Error('Espaço não encontrado');
    }
    return new ReturnSpaceDto(space);
  }

  async update(
    uuid: string,
    updateSpaceDto: UpdateSpaceDto,
  ): Promise<ReturnSpaceDto> {
    const result = await this.spacesRepository.update(uuid, updateSpaceDto);
    if (result.affected === 0) {
      throw new Error('Espaço não encontrado');
    }
    const space = await this.spacesRepository.findOne(uuid);
    return new ReturnSpaceDto(space);
  }

  async remove(uuid: string) {
    const result = await this.spacesRepository.delete(uuid);
    if (result.affected === 0) {
      throw new Error('Espaço não encontrado');
    }
  }
}
