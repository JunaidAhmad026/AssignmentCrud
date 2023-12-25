import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
    @ApiProperty()
    @IsString()
    roomId: string;
        
    @ApiProperty()
    @IsString()
    userName: string;
    
    @ApiProperty()
    @IsString()
    userIdCard: string;
    
    @ApiProperty()
    @IsDate()
    checkInDate: Date;
    
    @ApiProperty()
    @IsDate()
    checkOutDate: Date;
        
    @ApiProperty({default:''})
    @IsString()
    @IsOptional()    
    extras?: string;
    
    // @ApiProperty({default:0})
    @IsNumber()
    nights: number = 0;
}
export class FindBookingDto{
    @ApiProperty({required:false})
    @IsOptional()
    @IsDate()
    checkInDate: Date;
    
    @ApiProperty({required:false})
    @IsOptional()
    @IsDate()
    checkOutDate: Date;

    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    roomId: string;
}
