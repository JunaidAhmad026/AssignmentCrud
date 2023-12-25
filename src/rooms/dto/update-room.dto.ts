import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber, IsOptional } from "class-validator";
import { RoomsTypes } from "src/env.validation";

export class UpdateRoomDto  {
    @ApiProperty({ required: false, type: 'number' })
    @IsOptional()
    @IsNumber()
    roomNumber: number;

    @ApiProperty({ required: false, type: 'number' })
    @IsOptional()
    @IsNumber()
    beds: number;

    @ApiProperty({ required: false, type: 'boolean' })
    @IsOptional()
    @IsBoolean()
    wifi: Boolean = true;

    @ApiProperty({ required: false, type: 'boolean' })
    @IsOptional()
    @IsBoolean()
    pool: Boolean = true;

    @ApiProperty({ required: false, type: 'boolean' })
    @IsOptional()
    @IsBoolean()
    spa: Boolean = true;

    @ApiProperty({ required: false, type: 'boolean' })
    @IsOptional()
    @IsBoolean()
    parking: Boolean = true;

    @ApiProperty({ required: false, type: 'number' })
    @IsOptional()
    @IsNumber()
    washrooms: number;
  
    @ApiProperty({ required: false, type: 'number' })
    @IsOptional()
    @IsNumber()
    adults: number;
    
    @ApiProperty({ required: false, type: 'number' })
    @IsOptional()
    @IsNumber()
    kids: number;
    
    @ApiProperty({ required: false, type: 'number' })
    @IsOptional()
    @IsNumber()
    pricePerNight: number;
    
    @ApiProperty({ required: false})
    @IsOptional()
    @IsEnum(RoomsTypes)
    type?: RoomsTypes;
}
