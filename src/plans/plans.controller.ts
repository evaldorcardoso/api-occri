import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ReturnPlanDto } from './dto/return-plan.dto';
import { Role } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { SpacesRepository } from 'src/spaces/spaces.repository';

@Controller('plans')
@ApiTags('Plans')
export class PlansController {
  constructor(
    private readonly plansService: PlansService,
    @InjectRepository(SpacesRepository)
    private spacesRepository: SpacesRepository
  ) {}

  @Post('spaces/:uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new Plan for the specified Space' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'uuid',
    required: true,
    type: String,
    description: 'Space UUID',
  })
  @ApiCreatedResponse({ type: ReturnPlanDto })
  @Role(UserRole.ADMIN)
  async createPlan(
    @Param('uuid') space: string,
    @Body() createPlanDto: CreatePlanDto
  ): Promise<ReturnPlanDto> {
    const spaceObject = await this.spacesRepository.findOne({
      uuid: space,
    });
    if (!spaceObject) {
      throw new Error('Espaço não encontrado');
    }

    return await this.plansService.create(spaceObject, createPlanDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Find a Plan by UUID' })
  @ApiOkResponse({ type: ReturnPlanDto })
  async findOne(@Param('uuid') uuid: string): Promise<ReturnPlanDto> {
    return await this.plansService.findOne(uuid);
  }

  @Get('space/:uuid')
  @ApiOperation({ summary: 'Find all Plans of the specified Space' })
  @ApiParam({
    name: 'uuid',
    required: true,
    type: String,
    description: 'Space UUID',
  })
  @ApiOkResponse({ type: ReturnPlanDto })
  async findAll(@Param('uuid') space: string): Promise<ReturnPlanDto[]> {
    return await this.plansService.findAll(space);
  }

  @Patch(':uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a Plan by UUID' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReturnPlanDto })
  async update(
    @Param('uuid') uuid: string,
    @Body() updatePlanDto: UpdatePlanDto
  ): Promise<ReturnPlanDto> {
    return await this.plansService.update(uuid, updatePlanDto);
  }

  @Delete(':uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a Plan' })
  @ApiBearerAuth()
  @ApiOkResponse()
  async remove(@Param('uuid') uuid: string) {
    return await this.plansService.remove(uuid);
  }
}
