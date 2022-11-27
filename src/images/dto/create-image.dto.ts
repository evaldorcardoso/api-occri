import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateImageDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a url da imagem',
  })
  url: string

  @IsOptional()
  alt: string
}
