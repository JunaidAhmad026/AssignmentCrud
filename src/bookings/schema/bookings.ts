import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Bookings extends Document {
  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Rooms' })
  roomId: Types.ObjectId;
    
  @Prop()
  userName: string;
  
  @Prop()
  userIdCard: string;
  
  @Prop({ default: new Date() })
  checkInDate: Date;
  
  @Prop({ default: new Date() })
  checkOutDate: Date;
    
  @Prop()
  extras: string;
  
  @Prop()
  nights: number;
}
export const bookingsSchema = SchemaFactory.createForClass(Bookings);
