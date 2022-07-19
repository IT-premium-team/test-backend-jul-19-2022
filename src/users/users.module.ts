import { Module } from '@nestjs/common';
import { UsersHealthIndicator } from './users.health';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [UsersService, UsersHealthIndicator, ...usersProvider],
    controllers: [UsersController],
    exports: [UsersService, UsersHealthIndicator]
})
export class UsersModule {}
