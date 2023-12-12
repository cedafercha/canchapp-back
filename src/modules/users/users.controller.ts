import {
    Body,
    Controller,
    Post
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('createFirstUser')
    async createFirstUser(@Body() newUser: CreateUserDto): Promise<string> {
        return this.usersService.createFirstUser(newUser);
    };

    @Post('create')
    async create(@Body() newUser: CreateUserDto): Promise<string> {
        return this.usersService.createUser(newUser);
    };
}
