import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { bookingsSchema } from './schema/bookings';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'bookings', schema: bookingsSchema }])
  ],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
