import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UsersRepository } from './users.repository';
import { CompanyService } from '../company/company.service';
import { CreateUserCompanyDto } from './dto/CreateUserCompanyDto';
import { ProfileService } from '../profile/profile.service';
import { User } from './schemas/user.schema';
import { AddCompanyToUserDto } from './dto/AddCompanyToUserDto';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly companyService: CompanyService,
        private readonly profileService: ProfileService
    ) {}

    async createFirstUser(newUserDto: CreateUserDto): Promise<string> {
        try {
            const company = await this.companyService.getCompanyById(newUserDto.companyId);
            if(company){
                let newUser = new CreateUserCompanyDto();
                newUser.companies = [company];
                newUser.isAdmin = true;
                newUser.userName = newUserDto.userName;
                newUser.password = newUserDto.password;

                return (await this.usersRepository.create(newUser)).userName;
            }

            throw new BadRequestException("Company doesn't exists!");
        } catch(e){
            console.log('Error ' + e);
            throw new InternalServerErrorException(e.message, { cause: e });
        }
    }

    async createUser(newUserDto: CreateUserDto): Promise<string> {
        try {
            const [ company, profile ] = await Promise.all([
                this.companyService.getCompanyById(newUserDto.companyId),
                this.profileService.getProfileById(newUserDto.profileId)
            ]);

            if(company && profile) {
                let newUser = new CreateUserCompanyDto();
                newUser.companies = [company];
                newUser.profile = profile;
                newUser.isAdmin = false;
                newUser.userName = newUserDto.userName;
                newUser.password = newUserDto.password;

                return (await this.usersRepository.create(newUser)).userName;
            }

            throw new BadRequestException("Company or profile doesn't exists!");
        } catch(e){
            console.log('Error ' + e);
            throw new InternalServerErrorException(e.message, { cause: e });
        }
    };

    async findByUserName(userName: string): Promise<User> {
        return this.usersRepository.findOne({ userName: userName });
    };

    async addCompanyToUser(userToAdd: AddCompanyToUserDto): Promise<boolean> {
        const company = await this.companyService.getCompanyById(userToAdd.companyId);

        return this.usersRepository.addCompanyToUser(userToAdd.userName, company);
    };
}
