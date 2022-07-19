import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @Inject("UsersRepository")
        private readonly usersRepository: typeof User
    ) { }

    async getAll(): Promise<UserDto[]>{
        try {
            const users = await this.usersRepository.findAll<User>();
            return users.map(user => new UserDto(user))
        } catch (err) {
            this.logger.error(err);

            throw new HttpException(
                "Cannot access user list",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllActive(): Promise<UserDto[]>{
        try {
            const users = await this.usersRepository.findAll<User>({
                where: {
                    is_active: true
                }
            });
            return users.map(user => new UserDto(user))
        } catch (err) {
            this.logger.error(err);

            throw new HttpException(
                "Cannot access user list",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getById(userId: string): Promise<UserDto> {
        if (!userId) {
            this.logger.warn(`Trying to get a user with id ${userId}`);

            throw new HttpException(
                "User id is invalid",
                HttpStatus.BAD_REQUEST
            );
        }

        try {
            const user = await this.getUserById(userId);

            if (!user) {
                this.logger.warn(`Trying to get a user with id ${userId}`);

                throw new HttpException(
                    "User doesn't exist",
                    HttpStatus.NOT_FOUND
                );
            }

            return new UserDto(user);
        } catch (err) {
            this.logger.error(err);

            throw new HttpException(
                "Cannot access the user",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async create(payload: CreateUserDto): Promise<UserDto> {
        if (!payload || !payload.email?.trim()) {
            this.logger.warn(`Invalid payload to create user: ${JSON.stringify(payload)}`);

            throw new HttpException(
                "Payload is invalid",
                HttpStatus.BAD_REQUEST
            );
        }

        const email = payload.email.trim().toLowerCase();
        const firstName = payload.first_name.trim();
        const lastName = payload.last_name.trim();

        try {
            const alreadyExistingUser = await this.getUserByEmail(email);

            if (alreadyExistingUser) {
                this.logger.warn(`Trying to create a user with the same email ${email}`);

                throw new HttpException(
                    "User with such an email already exists",
                    HttpStatus.CONFLICT
                );
            }

            const user = new User();
            user.email = email;
            user.first_name = firstName;
            user.last_name = lastName;

            const userData = await user.save();

            return new UserDto(userData);
        } catch (err) {
            this.logger.error(err);

            throw new HttpException(
                "Cannot create user",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(userId: string, payload: UpdateUserDto) {
        if (!userId || !payload || !payload.email?.trim()) {
            this.logger.warn(`Invalid payload to update user: ${JSON.stringify(payload)}`);

            throw new HttpException(
                "Payload is invalid",
                HttpStatus.BAD_REQUEST
            );
        }

        try {
            const alreadyExistingUser = await this.getUserById(userId);

            if (!alreadyExistingUser) {
                this.logger.warn(`Trying to update the user with if ${userId}`);

                throw new HttpException(
                    "User not found",
                    HttpStatus.NOT_FOUND
                );
            }

            const email = payload.email.trim().toLowerCase();
            const firstName = payload.first_name.trim();
            const lastName = payload.last_name.trim();

            alreadyExistingUser.email = email;
            alreadyExistingUser.first_name = firstName;
            alreadyExistingUser.last_name = lastName;

            const userData = await alreadyExistingUser.save();

            return new UserDto(userData);
        } catch (err) {
            this.logger.error(err);

            throw new HttpException(
                "Cannot update user",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async delete(userId: string): Promise<void> {
        try {
            if (!userId) {
                this.logger.warn(`Invalid payload to delete user: ${userId}`);

                throw new HttpException(
                    "Payload is invalid",
                    HttpStatus.BAD_REQUEST
                );
            }

            const user = await this.getUserById(userId);
            await user.destroy();
        } catch (err) {
            this.logger.error(err);

            throw new HttpException(
                "Cannot delete user",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    private getUserById(id: string): Promise<User> {
        return this.usersRepository.findByPk<User>(id);
    }

    private getUserByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne<User>({
            where: {
              email
            },
        });
    }
}