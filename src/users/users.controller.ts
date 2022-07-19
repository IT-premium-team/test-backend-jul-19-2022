import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Version,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";
import { ApiOkResponse } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
	constructor(
		private readonly usersService: UsersService
	) {}

	@Version("1")
	@Get()
	@ApiOkResponse({ type: [UserDto] })
	getAllV1(): Promise<UserDto[]> {
		return this.usersService.getAll();
	}

	@Version("2")
	@Get()
	@ApiOkResponse({ type: [UserDto] })
	getAllV2(): Promise<UserDto[]> {
		return this.usersService.getAllActive();
	}

	@Get(":id")
	@ApiOkResponse({ type: UserDto })
	getUserById(@Param("id") id: string): Promise<UserDto> {
		return this.usersService.getById(id);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOkResponse({ type: UserDto })
	create(@Body() payload: CreateUserDto): Promise<UserDto> {
		return this.usersService.create(payload);
	}

	@Put(":id")
	@ApiOkResponse({ type: UserDto })
	update(@Body() payload: UpdateUserDto, @Param("id") id: string): Promise<UserDto> {
		return this.usersService.update(id, payload);
	}

	@Delete(":id")
	@ApiOkResponse()
	delete(@Param("id") id: string): Promise<void> {
		return this.usersService.delete(id);
	}
}
