import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ReturnSpaceDto } from './dto/return-space.dto';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { ReturnFindSpacesDto } from './dto/return-find-spaces.dto';
import { FindSpacesQueryDto } from './dto/find-spaces-query.dto';
import { ReturnSpaceWithPlansDto } from './dto/return-space-with-plans.dto';
import { CreateImageDto } from '../images/dto/create-image.dto';

@Controller('spaces')
@ApiTags('Spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) { }

  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new Space' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReturnSpaceDto })
  @Role(UserRole.ADMIN)
  async create(
    @Body() createSpaceDto: CreateSpaceDto
  ): Promise<ReturnSpaceDto> {
    return await this.spacesService.create(createSpaceDto);
  }

  @Post(':uuid/images')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Add a new image to this space' })
  @ApiCreatedResponse({ type: ReturnSpaceDto })
  async addImage(
    @Body(ValidationPipe) createImageDto: CreateImageDto,
    @Param('uuid') spaceUuid: string
  ): Promise<ReturnSpaceDto> {
    return await this.spacesService.addImage(spaceUuid, createImageDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Find a Space by UUID' })
  @ApiOkResponse({ type: ReturnSpaceWithPlansDto })
  async findOne(@Param('uuid') uuid: string): Promise<ReturnSpaceWithPlansDto> {
    return await this.spacesService.findOne(uuid);
  }

  @Get()
  @ApiOperation({ summary: 'Find all Spaces by filter query' })
  @ApiOkResponse({ type: ReturnFindSpacesDto })
  async findAll(
    @Query() query: FindSpacesQueryDto
  ): Promise<ReturnFindSpacesDto> {
    return await this.spacesService.findAll(query);
  }

  @Patch(':uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a Space by UUID' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReturnSpaceDto })
  async update(
    @Param('uuid') uuid: string,
    @Body(ValidationPipe) updateSpaceDto: UpdateSpaceDto
  ): Promise<ReturnSpaceDto> {
    return await this.spacesService.update(uuid, updateSpaceDto);
  }

  @Delete(':uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a Space' })
  @ApiBearerAuth()
  @ApiOkResponse()
  async remove(@Param('uuid') uuid: string) {
    return await this.spacesService.remove(uuid);
  }
}
