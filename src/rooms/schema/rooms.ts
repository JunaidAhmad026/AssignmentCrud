import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoomsTypes } from 'src/env.validation';

@Schema({ timestamps: true })
export class Rooms extends Document {
    
    @Prop()
    roomNumber: number;
    
    @Prop()
    beds: number;
    
    @Prop()
    washrooms: number;
    
    @Prop()
    adults: number;
    
    @Prop()
    kids: number;
    
    @Prop()
    pricePerNight: number;

    @Prop()
    wifi: Boolean;

    @Prop()
    parking: Boolean;
  
    @Prop()
    pool: Boolean;
    
    @Prop()
    spa: Boolean;
    
    @Prop({enum:RoomsTypes})
    type: RoomsTypes=RoomsTypes.Room;
}
export const roomsSchema = SchemaFactory.createForClass(Rooms);
