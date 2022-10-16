import { EntityRepository, Repository } from 'typeorm';
import { FindSpacesQueryDto } from './dto/find-spaces-query.dto';
import { ReturnFindSpacesDto } from './dto/return-find-spaces.dto';
import { Space } from './space.entity';

@EntityRepository(Space)
export class SpacesRepository extends Repository<Space> {
  async findSpaces(queryDto: FindSpacesQueryDto): Promise<ReturnFindSpacesDto> {
    queryDto.page = queryDto.page === undefined ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;
    queryDto.limit = queryDto.limit === undefined ? 100 : queryDto.limit;

    const { name } = queryDto;
    const query = this.createQueryBuilder('space');
    if (name) {
      query.andWhere('space.name LIKE :name', {
        name: `%${name}%`,
      });
    }

    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(+queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select([
      'space.uuid',
      'space.name',
      'space.description',
      'space.image_url',
      'space.image_alt',
      'space.occupation_max',
      'space.created_at',
    ]);

    const [spaces, total] = await query.getManyAndCount();

    return { spaces, total };
  }
}
