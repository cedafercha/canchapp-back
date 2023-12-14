import {
    Body,
    Controller,
    Post
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UsersService } from './users.service';
import { Admin } from '../auth/decorators/admin.decorator';
import { AddCompanyToUserDto } from './dto/AddCompanyToUserDto';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('createFirstUser')
    @Admin()
    async createFirstUser(@Body() newUser: CreateUserDto): Promise<string> {
        return this.usersService.createFirstUser(newUser);
    };

    // Limitar a que los usuarios multiLogin son admins (?)
    @Admin()
    @Post('addCompanyUser')
    async addCompanyToUser(@Body() newUser: AddCompanyToUserDto): Promise<boolean> {
        return this.usersService.addCompanyToUser(newUser);
    };

    @Post('create')
    async create(@Body() newUser: CreateUserDto): Promise<string> {
        return this.usersService.createUser(newUser);
    };
}
