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
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { ReturnEventDto } from './dto/return-event.dto';
import { FindEventsQueryDto } from './dto/find-spaces.dto';
import { ReturnFindEventsDto } from './dto/return-find-events.dto';

@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Create an event' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateEventDto })
  async create(
    @Body() createEventDto: CreateEventDto
  ): Promise<ReturnEventDto> {
    return await this.eventsService.create(createEventDto);
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Find an event by UUID' })
  @ApiOkResponse({ type: ReturnEventDto })
  async findOne(@Param('uuid') uuid: string): Promise<ReturnEventDto> {
    return await this.eventsService.findOne(uuid);
  }

  @Get()
  @ApiOperation({ summary: 'Find all events by filter query' })
  @ApiOkResponse({ type: ReturnEventDto })
  async findAll(
    @Param('booking') booking: string,
    @Query() query: FindEventsQueryDto
  ): Promise<ReturnFindEventsDto> {
    return await this.eventsService.findAll(booking, query);
  }

  @Patch(':uuid')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Update an Event by uuid' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReturnEventDto })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateEventDto: UpdateEventDto
  ): Promise<ReturnEventDto> {
    return await this.eventsService.update(uuid, updateEventDto);
  }

  @Delete(':uuid')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Delete and Event by uuid' })
  @ApiBearerAuth()
  @ApiOkResponse()
  async remove(@Param('uuid') uuid: string) {
    return await this.eventsService.remove(uuid);
  }
}
