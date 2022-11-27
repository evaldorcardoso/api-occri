import { EntityRepository, Repository } from "typeorm";
import { Image } from "./image.entity";

@EntityRepository(Image)
export class ImagesRepository extends Repository<Image> { }