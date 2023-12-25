import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { roomsSchema } from './schema/rooms';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'rooms', schema: roomsSchema }])
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
