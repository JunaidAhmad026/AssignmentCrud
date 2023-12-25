import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, FindBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
@ApiTags('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('my-bookings/:customerId')
  @ApiOperation({
    summary: 'Get my booking using customer id.',
  })
  findMyBookings(@Param('customerId') customerId: string) {
    return this.bookingsService.findMyBookings(customerId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a booking.',
  })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get all bookings.',
  })
  findAll(@Query() findBookingDto: FindBookingDto) {
    return this.bookingsService.findAll(findBookingDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific booking using id.',
  })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a booking uing id and updated data.',
  })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a booking.',
  })
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
