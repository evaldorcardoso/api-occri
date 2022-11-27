import { Controller, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { ReturnImageDto } from './dto/return-image.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../users/user-roles.enum';
import { Role } from '../auth/role.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Patch(':uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a Image by UUID' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ReturnImageDto })
  async update(@Param('uuid') uuid: string, @Body(ValidationPipe) updateImageDto: UpdateImageDto): Promise<ReturnImageDto> {
    return await this.imagesService.update(uuid, updateImageDto);
  }

  @Delete(':uuid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Role(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a Image' })
  @ApiBearerAuth()
  @ApiOkResponse()
  async remove(@Param('uuid') uuid: string) {
    return await this.imagesService.remove(uuid);
  }
}
