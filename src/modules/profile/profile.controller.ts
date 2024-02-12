import { Body, Controller, Get, Post, Param, Query } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { Profile } from "./schemas/profile.schema";
import { CreateProfileDto } from "./dto/CreateProfileDto";
import { AddModulesProfileDto } from "./dto/AddModulesProfileDto";
import { ViewProfileDto } from "./dto/ViewProfileDto";

@Controller('api/v1/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService){}

    @Get('findAll')
    async findAll(): Promise<Profile[]> {
        return this.profileService.findAll();
    }

    @Get('find/:id')
    async getProfileById(@Param('id') profileId: string): Promise<ViewProfileDto> {
        return this.profileService.getProfileById(profileId);
    }

    @Post('create')
    async create(@Body() newProfile: CreateProfileDto): Promise<Profile> {
        return this.profileService.create(newProfile);
    };

    @Post('addModules') // sirve también para añadir actions a módulo existente en profile!
    async addModules(@Body() profileData: AddModulesProfileDto): Promise<Profile> {
        return this.profileService.addModules(profileData);
    };
}