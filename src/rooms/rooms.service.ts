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

  findOne(id: string) {
    return this.roomsInfo.findOne({_id : id});
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomsInfo.findOneAndUpdate({_id : id}, updateRoomDto, {new: true});
  }

  remove(id: string) {
    return this.roomsInfo.deleteOne({_id : id});
  }
}
