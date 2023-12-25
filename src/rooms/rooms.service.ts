import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Rooms } from './schema/rooms';

@Injectable()
export class RoomsService {
  constructor(@InjectModel('rooms') private roomsInfo: Model<Rooms>){}
  create(createRoomDto: CreateRoomDto) {
    const room = new this.roomsInfo(createRoomDto)
    return room.save();
  }

  findAll() {
    return this.roomsInfo.find();
  }

  findOne(id: number) {
    return this.roomsInfo.findOne({roomNumber : id});
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomsInfo.findOneAndUpdate({roomNumber : id}, updateRoomDto);
  }

  remove(id: number) {
    return this.roomsInfo.deleteOne({roomNumber : id});
  }
}
