import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
    @ApiProperty()
    @IsString()
    @IsOptional()    
    fullName: string;
    
    @ApiProperty()
    @IsEmail()
    @IsOptional()    
    email: string;
    
    @ApiProperty()
    @IsOptional()    
    @IsString()
    image: string;
    
    @ApiProperty()
    @IsOptional()    
    @IsString()
    phone: string;
}
