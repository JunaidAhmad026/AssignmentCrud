import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Bookings extends Document {
  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Rooms' })
  roomId: Types.ObjectId;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Customers' })
  customerId: Types.ObjectId;
   
  @Prop({ default: new Date(),set: stripTime })
  checkInDate: Date;
  
  @Prop({ default: new Date(), set: stripTime})
  checkOutDate: Date;
    
  @Prop()
  extras: string;
  
  @Prop()
  nights: number;
}

function stripTime(date:Date) {
  return new Date(date.toISOString().split('T')[0]);
}

export const bookingsSchema = SchemaFactory.createForClass(Bookings);
