import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBookingDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    roomId: string;
    
    @ApiProperty()
    @IsDate()
    @IsOptional()
    checkInDate: Date;
    
    @ApiProperty()
    @IsDate()
    @IsOptional()
    checkOutDate: Date;
        
    @ApiProperty({default:''})
    @IsString()
    @IsOptional()    
    @IsOptional()
    extras?: string;
    
    // @ApiProperty({default:0})
    @IsNumber()
    nights: number = 0;
}
