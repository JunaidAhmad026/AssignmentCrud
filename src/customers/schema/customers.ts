import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Customers extends Document {
    @Prop()
    fullName: string;
    
    @Prop()
    email: string;
    
    @Prop()
    image: string;
    
    @Prop()
    phone: string;
}
export const customersSchema = SchemaFactory.createForClass(Customers);
