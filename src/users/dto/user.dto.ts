import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../user.entity';

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

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

    @ApiProperty()
    @IsBoolean()
    readonly is_active: boolean;

    constructor(user: User) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.is_active = user.is_active;
    }
}