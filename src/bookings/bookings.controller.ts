import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { Role } from '../auth/role.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/user-roles.enum';
import { User } from '../users/user.entity';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FindBookingsQueryDto } from './dto/find-bookings-query.dto';
import { ReturnBookingDto } from './dto/return-booking.dto';
import { ReturnFindBookingsDto } from './dto/return-find-bookings.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
@ApiTags('Bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('me')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Find all Bookings of the logged user' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReturnFindBookingsDto })
  async findMyBookings(
    @Query() query: FindBookingsQueryDto,
    @GetUser() user: User,
  ): Promise<ReturnFindBookingsDto> {
    query.user = user.uuid;
    return await this.bookingsService.findAll(query);
  }

  @Get(':uuid')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Find a Booking by UUID' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReturnBookingDto })
  async findOne(@Param('uuid') uuid: string): Promise<ReturnBookingDto> {
    return await this.bookingsService.findOne(uuid);
  }

  @Patch(':uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a Booking by UUID' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReturnBookingDto })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<ReturnBookingDto> {
    return await this.bookingsService.update(uuid, updateBookingDto);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Find all Bookings by filter query' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReturnFindBookingsDto })
  async findAll(
    @Query() query: FindBookingsQueryDto,
  ): Promise<ReturnFindBookingsDto> {
    return await this.bookingsService.findAll(query);
  }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Register a new Booking' })
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ReturnBookingDto })
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @GetUser() user: User,
  ): Promise<ReturnBookingDto> {
    return await this.bookingsService.create(user, createBookingDto);
  }

  @Post('/p')
  @ApiOperation({ summary: 'Register a new Booking' })
  @ApiCreatedResponse({ type: ReturnBookingDto })
  async createPublic(
    @Body(ValidationPipe) createBookingDto: CreateBookingDto,
  ): Promise<ReturnBookingDto> {
    return await this.bookingsService.create(null, createBookingDto);
  }

  @Delete(':uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a Booking' })
  @ApiBearerAuth()
  @ApiOkResponse()
  async remove(@Param('uuid') uuid: string) {
    return await this.bookingsService.remove(uuid);
  }
}
