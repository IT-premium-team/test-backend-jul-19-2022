import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly first_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly last_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly email: string;
}