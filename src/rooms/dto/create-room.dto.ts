import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNumber } from "class-validator";
import { RoomsTypes } from "src/env.validation";

export class CreateRoomDto {
    @ApiProperty({ required: false, type: 'number' })
    @IsNumber()
    roomNumber: number;

    @ApiProperty({ required: false, type: 'number' })
    @IsNumber()
    beds: number;

    @ApiProperty({ required: false, type: 'boolean' })
    @IsBoolean()
    wifi: Boolean = true;

    @ApiProperty({ required: false, type: 'boolean' })
    @IsBoolean()
    pool: Boolean = true;

    @ApiProperty({ required: false, type: 'boolean' })
    @IsBoolean()
    spa: Boolean = true;

    @ApiProperty({ required: false, type: 'boolean' })
    @IsBoolean()
    parking: Boolean = true;

    @ApiProperty({ required: false, type: 'number' })
    @IsNumber()
    washrooms: number;
  
    @ApiProperty({ required: false, type: 'number' })
    @IsNumber()
    adults: number;
    
    @ApiProperty({ required: false, type: 'number' })
    @IsNumber()
    kids: number;
    
    @ApiProperty({ required: false, type: 'number' })
    @IsNumber()
    pricePerNight: number;
    
    @ApiProperty({ required: false})
    @IsEnum(RoomsTypes)
    type: RoomsTypes = RoomsTypes.Room;
}
