import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindSpacesQueryDto extends BaseQueryParametersDto {
  name: string;
}
