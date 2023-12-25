import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Customers extends Document {
    @ApiProperty()
    @Prop()
    fullName: string;
    
    @ApiProperty()
    @Prop()
    email: string;
    
    @ApiProperty()
    @Prop()
    image: string;
    
    @ApiProperty()
    @Prop()
    phone: string;
}
export const customersSchema = SchemaFactory.createForClass(Customers);
