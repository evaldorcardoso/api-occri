import { ApiProperty } from "@nestjs/swagger";
import { Image } from "../image.entity";

export class ReturnImageDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  alt: string;

  constructor(image: Image) {
    this.uuid = image.uuid;
    this.url = image.url;
    this.alt = image.alt;
  }
}