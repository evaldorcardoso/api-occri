import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { User } from './user.entity';
import { FindUsersQueryDto } from './dto/find-users-query.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ReturnFindUsersDto } from './dto/return-find-users.dto';
import { GetUser } from '../auth/get-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { UserRole } from './user-roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth.guard';

@Controller('users')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new Admin User' })
  @ApiCreatedResponse({ type: ReturnUserDto })
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    return await this.usersService.createAdminUser(createUserDto);
  }

  @Get(':uuid')
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get an user by uuid' })
  @ApiOkResponse({ type: ReturnUserDto })
  async findUserByUuid(@Param('uuid') uuid): Promise<ReturnUserDto> {
    return await this.usersService.findUserByUuid(uuid);
  }

  @Get()
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Find users by filter query' })
  @ApiOkResponse({ type: ReturnFindUsersDto })
  async findUsers(@Query() query: FindUsersQueryDto) {
    const data = await this.usersService.findUsers(query);

    return {
      users: data.users,
      total: data.total,
    };
  }

  @Patch(':uuid')
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update the admin user data' })
  @ApiOkResponse({ type: ReturnUserDto })
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('uuid') uuid: string,
  ): Promise<ReturnUserDto> {
    const userToUpdate = await this.usersService.findUserByUuid(uuid);
    if (user.uuid.toString() != uuid && userToUpdate.role != UserRole.ADMIN) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar este recurso',
      );
    }

    return await this.usersService.updateUser(updateUserDto, uuid);
  }

  @Delete(':uuid')
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete an user' })
  @ApiOkResponse()
  async deleteUser(@Param('uuid') uuid: string) {
    await this.usersService.deleteUser(uuid);
    return {
      message: 'Usuário deletado com sucesso',
    };
  }
}
