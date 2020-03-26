import { Module, NestModule, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../db/models/user.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ])
    ],
    providers: [
        UsersService
    ],
    controllers: [
        UsersController
    ],
    exports: [UsersService]
})

export class UserModule {}