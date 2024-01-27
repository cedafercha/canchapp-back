import {
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UsersService } from './users.service';
import { Admin } from '../auth/decorators/admin.decorator';
import { AddCompanyToUserDto } from './dto/AddCompanyToUserDto';
import { FindUserDto } from './dto/FindUserDto';
import { Company } from '../company/schemas/company.schema';
import { UserAdmin } from '../auth/decorators/admin.user.decorator';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Admin()
    @Post('createFirstUser')
    async createFirstUser(@Body() newUser: CreateUserDto): Promise<string> {
        return this.usersService.createFirstUser(newUser);
    };

    @Admin()
    @Post('addCompanyUser')
    async addCompanyToUser(@Body() newUser: AddCompanyToUserDto): Promise<boolean> {
        return this.usersService.addCompanyToUser(newUser);
    };

    @Get('findAll')
    async findAll(): Promise<FindUserDto[]> {
        return this.usersService.findAll();
    }

    @UserAdmin()
    @Post('create')
    async create(@Body() newUser: CreateUserDto): Promise<string> {
        return this.usersService.createUser(newUser);
    };

    @Get('findCompanies')
    async findCompanies(): Promise<Company[]> {
        return this.usersService.findCompanies();
    }
}
