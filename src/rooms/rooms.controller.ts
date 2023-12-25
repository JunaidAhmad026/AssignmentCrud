import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
  @ApiTags('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a room.',
  })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all room.',
  })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
    @ApiOperation({
    summary: 'Get a specific room by room id.',
  })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
    @ApiOperation({
    summary: 'Update a specific room by id and updated fields.',
  })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
    @ApiOperation({
    summary: 'Delete a room.',
  })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
