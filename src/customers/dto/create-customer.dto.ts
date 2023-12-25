import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty()
    @IsString()
    fullName: string;
    
    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()    
    image: string;
    
    @ApiProperty()
    @IsString()
    phone: string;
}
