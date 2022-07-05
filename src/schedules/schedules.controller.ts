import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReturnScheduleDto } from './dto/return-schedule.dto';
import { FindSchedulesQueryDto } from './dto/find-schedules-query.dto';
import { ReturnFindSchedulesDto } from './dto/return-find-schedules.dto';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';
import { UserRole } from 'src/users/user-roles.enum';

@Controller('schedules')
@ApiTags('Schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post('bookings/:booking')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a schedule' })
  @ApiBearerAuth()
  @ApiParam({ name: 'booking', type: String, required: false })
  @ApiOkResponse({ type: ReturnScheduleDto })
  async create(
    @Param('booking') booking: string,
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<ReturnScheduleDto> {
    return await this.schedulesService.create(booking, createScheduleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all Schedules by filter query' })
  @ApiOkResponse({ type: ReturnScheduleDto })
  async findAll(
    @Param('booking') booking: string,
    @Query() query: FindSchedulesQueryDto,
  ): Promise<ReturnFindSchedulesDto> {
    return await this.schedulesService.findAll(booking, query);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Find a Schedule by UUID' })
  @ApiOkResponse({ type: ReturnScheduleDto })
  async findOne(@Param('uuid') uuid: string): Promise<ReturnScheduleDto> {
    return await this.schedulesService.findOne(uuid);
  }

  @Patch(':uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a Schedule by UUID' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReturnScheduleDto })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<ReturnScheduleDto> {
    return await this.schedulesService.update(uuid, updateScheduleDto);
  }

  @Delete(':uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a Schedule by UUID' })
  @ApiBearerAuth()
  @ApiOkResponse()
  async remove(@Param('uuid') uuid: string) {
    return await this.schedulesService.remove(uuid);
  }
}
