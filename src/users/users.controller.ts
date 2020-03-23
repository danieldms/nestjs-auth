import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from '../dto/user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get()
    async index() {
        return await this.userService.findAll();
    }

    @Post()
    async create(@Body() userData: CreateUser) {
        return await this.userService.store(userData);
    }

    @Put('/update/:uuid')
    async update(@Param() params) {
        return null;
    }

    @Delete('/delete/:uuid')
    async delete(@Param() params) {
        const { data } = await this.userService.delete(params.uuid);
        
        if(data.affected == 0) {
            throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
        }

        return { message: "User deleted!", data: [] };
    }
}
