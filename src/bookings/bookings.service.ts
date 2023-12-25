import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookingDto, FindBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Bookings } from './schema/bookings';

@Injectable()
export class BookingsService {
  constructor(@InjectModel('bookings') private bookingsInfo: Model<Bookings>) { }
  
  async create(createBookingDto: CreateBookingDto) {
    await this.checkAvailability(createBookingDto);
    createBookingDto.nights = await this.daysBetweenDates(createBookingDto.checkInDate,createBookingDto.checkOutDate)
    const booking = new this.bookingsInfo(createBookingDto);
    return booking.save();
  }

  async checkAvailability(createBookingDto: CreateBookingDto) {
    const existingBooking = await this.bookingsInfo.find({
      roomId: createBookingDto.roomId,
      $or:[
            {
              checkInDate: { $lt: createBookingDto.checkOutDate },
              checkOutDate: { $gt: createBookingDto.checkInDate }
            },
            {
              checkInDate: { $lte: createBookingDto.checkInDate },
              checkOutDate: { $gt: createBookingDto.checkInDate }
            },
            {
              checkInDate: { $gt: createBookingDto.checkInDate },
              checkOutDate: { $lte: createBookingDto.checkOutDate }
            }
        ]
    });
    if (existingBooking.length)
      throw new BadRequestException("This room is not available in you desired dates.")
  }

  async checkAvailabilityOtherThanCurrentBooking(createBookingDto: UpdateBookingDto, bookingId: string) {
    const existingBooking = await this.bookingsInfo.find({
      roomId: createBookingDto.roomId,
      _id:{$ne: bookingId},
      $or:[
            {
              checkInDate: { $lt: createBookingDto.checkOutDate },
              checkOutDate: { $gt: createBookingDto.checkInDate }
            },
            {
              checkInDate: { $lte: createBookingDto.checkInDate },
              checkOutDate: { $gt: createBookingDto.checkInDate }
            },
            {
              checkInDate: { $gt: createBookingDto.checkInDate },
              checkOutDate: { $lte: createBookingDto.checkOutDate }
            }
        ]
    });
    if (existingBooking.length)
      throw new BadRequestException("This room is not available in you desired dates.")
  }

  daysBetweenDates(startDate: Date, endDate: Date) {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    throw new Error('Invalid date provided. Please ensure both dates are valid Date objects.');
  }
  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return daysDifference;
}

  async findAll(data: FindBookingDto) {
    const baseQuery = {};
    if ((data.checkInDate && !data.checkOutDate) || (!data.checkInDate && data.checkOutDate)) {
      throw new BadRequestException("Kindly provide both checkin and checkout dates")
    }
    if (data.checkInDate) {
      (baseQuery as any).checkInDate = { $lt: data.checkOutDate };
      (baseQuery as any).checkOutDate = { $gt: data.checkInDate };
    }
    if (data.roomId) {
      (baseQuery as any).roomId = data.roomId ;
    }
    console.log(baseQuery)
    const bookings = await this.bookingsInfo.find(baseQuery);
    return {data: bookings, count: await this.bookingsInfo.count(baseQuery)}
  }

  async findOne(id: string) {
    console.log(id)
    const x = await this.bookingsInfo.aggregate(
  [
    {
      $match: {
        _id: new Types.ObjectId(id)
      }
    },
    {
      $lookup: {
        from: 'rooms',
        localField: 'roomId',
        foreignField: '_id',
        as: 'room'
      }
    },
    { $unwind: { path: '$room' } }
  ],
);
    return x
  // return this.bookingsInfo.findById(id).populate("roomId")
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingsInfo.findById(id);
    if (!booking) throw new BadRequestException("No such booking exists");
    if (updateBookingDto.checkInDate || updateBookingDto.checkOutDate) {
      if (!updateBookingDto.checkInDate) updateBookingDto.checkInDate = booking?.checkInDate;
      if (!updateBookingDto.checkOutDate) updateBookingDto.checkOutDate = booking?.checkOutDate;
      if (!updateBookingDto.roomId) updateBookingDto.roomId = booking?.roomId.toString();
      await this.checkAvailabilityOtherThanCurrentBooking(updateBookingDto, id);
      updateBookingDto.nights = await this.daysBetweenDates(updateBookingDto.checkInDate, updateBookingDto.checkOutDate); 
    }
    return this.bookingsInfo.findOneAndUpdate({_id : id}, updateBookingDto);
  }

  remove(id: string) {
    return this.bookingsInfo.deleteOne({ _id : id });
  }
}
