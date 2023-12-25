import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { RoomsTypes } from 'src/env.validation';

@Schema({ timestamps: true })
export class Rooms extends Document {
    @ApiProperty()
    @Prop()
    roomNumber: number;
    
    @ApiProperty()
    @Prop()
    beds: number;
    
    @ApiProperty()
    @Prop()
    washrooms: number;
    
    @ApiProperty()
    @Prop()
    adults: number;
    
    @ApiProperty()
    @Prop()
    kids: number;
    
    @ApiProperty()
    @Prop()
    pricePerNight: number;

    @ApiProperty()
    @Prop()
    wifi: Boolean;

    @ApiProperty()
    @Prop()
    parking: Boolean;
  
    @ApiProperty()
    @Prop()
    pool: Boolean;
  
    @ApiProperty()
    @Prop()
    spa: Boolean;
    
    @ApiProperty()
    @Prop({enum:RoomsTypes})
    type: RoomsTypes=RoomsTypes.Room;
}
export const roomsSchema = SchemaFactory.createForClass(Rooms);
